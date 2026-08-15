import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, useWindowDimensions, StyleSheet } from "react-native";
import { Dumbbell, User, Users, ChevronRight, ArrowRight } from "lucide-react-native";
import { C, FONT } from "../theme";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function OptionCard({ selected, onPress, icon, title, description, iconSize }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[s.option, selected && s.optionSelected]}
    >
      <View style={[s.optionIconWrap, { width: iconSize, height: iconSize, borderRadius: iconSize / 2.4 }, selected && s.optionIconWrapSelected]}>
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.optionTitle}>{title}</Text>
        <Text style={s.optionDesc}>{description}</Text>
      </View>
      <ChevronRight size={18} color={selected ? C.lime : C.mutedDark} />
    </TouchableOpacity>
  );
}

export default function RoleSelectScreen({ onSelect }) {
  const [selected, setSelected] = useState("member");
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 700;
  const isNarrow = width < 360;
  const badgeSize = clamp(width * 0.16, 56, 64);
  const optionIconSize = clamp(width * 0.13, 44, 52);
  const ctaHeight = isSmallScreen ? 52 : 58;

  return (
    <View style={s.root}>
      <ScrollView
        contentContainerStyle={[s.container, { paddingTop: isSmallScreen ? 24 : 40 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[s.badge, { width: badgeSize, height: badgeSize, borderRadius: badgeSize / 2.6 }]}>
          <Dumbbell size={26} color="#FFFFFF" />
        </View>

        <Text style={[s.title, { fontSize: isNarrow ? 20 : 23 }]}>Who's using GYMFIT?</Text>
        <Text style={s.subtitle}>Tell us how you'll be using the app so we can set up the right experience.</Text>

        <OptionCard
          selected={selected === "member"}
          onPress={() => setSelected("member")}
          icon={<User size={22} color={selected === "member" ? C.lime : C.text} />}
          title="I'm a Member"
          description="Book classes, follow plans, and track your progress."
          iconSize={optionIconSize}
        />

        <OptionCard
          selected={selected === "trainer"}
          onPress={() => setSelected("trainer")}
          icon={<Users size={22} color={selected === "trainer" ? C.lime : C.text} />}
          title="I'm a Trainer"
          description="Manage your schedule, clients, and check-ins."
          iconSize={optionIconSize}
        />

        <View style={{ flex: 1, minHeight: 32 }} />

        <TouchableOpacity
          activeOpacity={0.85}
          style={[s.cta, { height: ctaHeight }]}
          onPress={() => onSelect(selected)}
        >
          <Text style={s.ctaText}>Continue as {selected === "member" ? "Member" : "Trainer"}</Text>
          <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 32 },
  badge: { alignItems: "center", justifyContent: "center", backgroundColor: C.lime },
  title: { fontFamily: FONT.headingBold, color: C.text, marginTop: 20, lineHeight: 32 },
  subtitle: { fontFamily: FONT.body, fontSize: 12, color: C.muted, marginTop: 8, lineHeight: 20 },
  option: {
    flexDirection: "row", alignItems: "center", gap: 14,
    marginTop: 14, padding: 16, borderRadius: 18,
    backgroundColor: C.surface, borderWidth: 1.5, borderColor: "transparent",
  },
  optionSelected: { borderColor: C.lime },
  optionIconWrap: { alignItems: "center", justifyContent: "center", backgroundColor: C.surfaceAlt },
  optionIconWrapSelected: { backgroundColor: "rgba(139,92,246,0.16)" },
  optionTitle: { fontFamily: FONT.headingBold, fontSize: 13, color: C.text },
  optionDesc: { fontFamily: FONT.body, fontSize: 10, color: C.muted, marginTop: 3, lineHeight: 16 },
  cta: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    borderRadius: 16, backgroundColor: C.lime,
    shadowColor: C.lime, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 8,
  },
  ctaText: { fontFamily: FONT.bodyBold, fontSize: 12.5, color: "#FFFFFF" },
});
