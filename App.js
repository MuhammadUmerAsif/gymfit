import React, { useReducer, useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Home, CalendarDays, Dumbbell, QrCode, User, ScanLine, Users, ArrowLeftRight,
  Bell, LayoutDashboard,
} from "lucide-react-native";
import {
  useFonts,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
} from "@expo-google-fonts/ibm-plex-mono";

import { C, FONT } from "./src/theme";
import { Toast, Avatar } from "./src/components/ui";
import { initialState, reducer } from "./src/state/store";
import { HomeScreen, ActivityScreen, BookScreen, QRScreen, ProfileScreen } from "./src/screens/MemberScreens";
import { ScheduleScreen, ScanScreen, ClientsScreen, TrainerDashboardScreen, TrainerProfileScreen } from "./src/screens/TrainerScreens";
import DetailScreen from "./src/screens/DetailScreens";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import RoleSelectScreen from "./src/screens/RoleSelectScreen";
import SplashScreen from "./src/screens/SplashScreen";

const MEMBER_TABS = [
  { key: "home", label: "Home", icon: Home, title: "Hi, Sara" },
  { key: "classes", label: "Classes", icon: CalendarDays, title: "Activity" },
  { key: "book", label: "Book", icon: Dumbbell, title: "Book a service" },
  { key: "qr", label: "My QR", icon: QrCode, title: "My QR" },
  { key: "profile", label: "Profile", icon: User, title: "Profile" },
];
const TRAINER_TABS = [
  { key: "dashboard", label: "Overview", icon: LayoutDashboard, title: "Overview" },
  { key: "schedule", label: "Schedule", icon: CalendarDays, title: "Schedule" },
  { key: "scan", label: "Scan", icon: ScanLine, title: "Scan attendance" },
  { key: "clients", label: "Clients", icon: Users, title: "Clients" },
  { key: "trainerProfile", label: "Profile", icon: User, title: "Profile" },
];


export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    Oswald_600SemiBold,
    Oswald_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
  });

  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [roleChosen, setRoleChosen] = useState(false);
  const [role, setRole] = useState("member");
  const [memberTab, setMemberTab] = useState("home");
  const [trainerTab, setTrainerTab] = useState("dashboard");
  const [detail, setDetail] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const openDetail = (type, payload) => setDetail({ type, payload });
  const closeDetail = () => setDetail(null);

  const tabs = role === "member" ? MEMBER_TABS : TRAINER_TABS;
  const activeKey = role === "member" ? memberTab : trainerTab;
  const setActiveKey = role === "member" ? setMemberTab : setTrainerTab;
  const activeTab = tabs.find((t) => t.key === activeKey);

  useEffect(() => {
    if (state.toast) {
      const t = setTimeout(() => dispatch({ type: "CLEAR_TOAST" }), 2200);
      return () => clearTimeout(t);
    }
  }, [state.toast]);

  const navigate = (key) => setMemberTab(key);

  if (!fontsLoaded) {
    return <View style={styles.loading} />;
  }

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (showOnboarding) {
    return <OnboardingScreen onFinish={() => setShowOnboarding(false)} />;
  }

  if (!roleChosen) {
    return (
      <RoleSelectScreen
        onSelect={(pickedRole) => {
          setRole(pickedRole);
          setRoleChosen(true);
        }}
      />
    );
  }

  const renderScreen = () => {
    if (role === "member") {
      if (memberTab === "home") return <HomeScreen state={state} dispatch={dispatch} navigate={navigate} openDetail={openDetail} />;
      if (memberTab === "classes") return <ActivityScreen state={state} dispatch={dispatch} openDetail={openDetail} />;
      if (memberTab === "book") return <BookScreen state={state} dispatch={dispatch} navigate={navigate} />;
      if (memberTab === "qr") return <QRScreen state={state} dispatch={dispatch} />;
      if (memberTab === "profile") return <ProfileScreen state={state} dispatch={dispatch} role={role} setRole={setRole} />;
    } else {
      if (trainerTab === "dashboard") return <TrainerDashboardScreen state={state} />;
      if (trainerTab === "schedule") return <ScheduleScreen state={state} />;
      if (trainerTab === "scan") return <ScanScreen state={state} dispatch={dispatch} />;
      if (trainerTab === "clients") return <ClientsScreen state={state} dispatch={dispatch} />;
      if (trainerTab === "trainerProfile") return <TrainerProfileScreen role={role} setRole={setRole} />;
    }
    return null;
  };

  return (
    <View style={styles.stage}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.phone} edges={["top"]}>
        {detail ? (
          <DetailScreen detail={detail} onBack={closeDetail} state={state} dispatch={dispatch} openDetail={openDetail} bottomInset={insets.bottom} />
        ) : (
          <>
          <View style={styles.topbar}>
            <View style={styles.topbarLeft}>
              <Avatar size={42} radius={14}>{role === "member" ? "SA" : "MK"}</Avatar>
              <View>
                {role === "member" && activeKey === "home" ? (
                  <>
                    <Text style={styles.greeting}>HI, SARA</Text>
                    <Text style={styles.greetingSub}>⚡ Fitness Freak</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.greeting}>{activeTab?.title}</Text>
                    <Text style={styles.greetingSub}>GYMFIT · {role === "member" ? "Member" : "Trainer"}</Text>
                  </>
                )}
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              {role === "member" && activeKey === "home" && (
                <TouchableOpacity activeOpacity={0.8} style={styles.bellBtn} onPress={() => openDetail("notifications")}>
                  <Bell size={16} color={C.text} fill={C.text} />
                  <View style={styles.bellDot} />
                </TouchableOpacity>
              )}
              <TouchableRolePill role={role} onPress={() => setRole(role === "member" ? "trainer" : "member")} />
            </View>
          </View>

          <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
            {renderScreen()}
          </ScrollView>

          <Toast text={state.toast} />

          <View style={[styles.bottomNavWrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
            <View style={styles.bottomNav}>
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = activeKey === t.key;
                return (
                  <TouchableOpacity
                    key={t.key}
                    activeOpacity={0.7}
                    onPress={() => setActiveKey(t.key)}
                    style={styles.navItemTouchable}
                  >
                    <View style={[styles.navBubble, active ? styles.navBubbleActive : styles.navBubbleInactive]}>
                      <Icon
                        size={20}
                        color={active ? "#8B5CF6" : "#A39EBA"}
                        strokeWidth={active ? 2.4 : 2.0}
                      />
                      <Text style={[styles.navLabel, active ? styles.navLabelActive : styles.navLabelInactive]}>
                        {t.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          </>
        )}
        </SafeAreaView>
    </View>
  );
}

function TouchableRolePill({ role, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.75} style={styles.rolePill} onPress={onPress}>
      <Text style={styles.rolePillText}>{role === "member" ? "Member" : "Trainer"}</Text>
      <ArrowLeftRight size={12} color={C.lime} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: C.bg },
  stage: {
    flex: 1,
    backgroundColor: C.stage,
    justifyContent: "center",
    alignItems: "center",
  },
  phone: {
    flex: 1,
    backgroundColor: C.bg,
    width: "100%",
    maxWidth: 500,
    // Add subtle shadow for premium desktop web preview
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
  },
  topbarLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  greeting: { color: C.text, fontFamily: "Oswald_700Bold", fontSize: 16.5 },
  greetingSub: { color: C.mutedDark, fontFamily: "IBMPlexMono_500Medium", fontSize: 9, marginTop: 2, letterSpacing: 0.5 },
  rolePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.line,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100,
  },
  rolePillText: {
    color: C.lime,
    fontFamily: "IBMPlexMono_600SemiBold",
    fontSize: 9.5,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  screen: { flex: 1 },
  screenContent: { paddingHorizontal: 20, paddingBottom: 160 },
  bottomNavWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.surface,
    borderTopWidth: 1,
    borderTopColor: C.line,
    zIndex: 100,
    elevation: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
  },
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 8,
  },
  navItemTouchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navBubble: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    width: "100%",
  },
  navBubbleInactive: {
    backgroundColor: "transparent",
  },
  navBubbleActive: {
    backgroundColor: "rgba(139, 92, 246, 0.16)",
  },
  navLabel: {
    fontSize: 10.5,
    fontFamily: "Inter_600SemiBold",
    marginTop: 3,
    letterSpacing: 0.2,
  },
  navLabelActive: {
    color: "#8B5CF6",
  },
  navLabelInactive: {
    color: "#A39EBA",
  },
  bellBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: C.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: C.line,
  },
  bellDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.coral,
  },
});
