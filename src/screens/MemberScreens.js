import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  CalendarDays, Dumbbell, QrCode, ChevronRight, ChevronLeft, Flame,
  RefreshCcw, Check, Plus, TrendingUp, Utensils, Sparkles, Snowflake,
  ArrowUpRight, Bell, LayoutGrid, Footprints,
} from "lucide-react-native";
import { C, FONT } from "../theme";
import RepRing from "../components/RepRing";
import { FakeQR, Pulse } from "../components/FakeQR";
import Svg, { Path, Circle } from "react-native-svg";
import { PLAN_OPTIONS, CATEGORIES } from "../state/store";
import { CALENDAR_WEEKS, ACTIVITY_HISTORY } from "../data/dummy";
import { Card, HeroCard, StatTile, SectionTitle, RowBetween, Row, Btn, IconBtn, Chip, Avatar, ListRow, Badge, LinkBtn, initials } from "../components/ui";

const ICONS = { Dumbbell, Utensils, Sparkles };

export function HomeScreen({ state, dispatch, navigate, openDetail }) {
  const m = state.membership;
  const upcoming = state.bookings.filter((b) => b.status === "upcoming");
  const [selectedCategory, setSelectedCategory] = useState("All workouts");
  const [showMembershipSettings, setShowMembershipSettings] = useState(false);

  const WORKOUTS = [
    {
      id: "lower_body",
      title: "Lower body workout",
      category: "Lower body",
      duration: "30 mins",
      exercisesCount: "5 exercises",
      type: "Cardio",
      tags: "Glutes/ Squads / Hamstrings",
      backgroundColor: "#8B5CF6",
      image: require("../../assets/workout_lower_body.png"),
      imgWidth: 156,
      imgHeight: 164,
    },
    {
      id: "upper_body",
      title: "Upper body workout",
      category: "Upper body",
      duration: "20 mins",
      exercisesCount: "6 exercises",
      type: "Strength",
      tags: "Arms / Chest / Back",
      backgroundColor: "#6D4FC7",
      image: require("../../assets/workout_upper_body.png"),
      imgWidth: 156,
      imgHeight: 174,
    },
  ];

  const filteredWorkouts = selectedCategory === "All workouts"
    ? WORKOUTS
    : WORKOUTS.filter((w) => w.category === selectedCategory);

  return (
    <View style={{ gap: 14 }}>
      {/* Progress Card */}
      <View style={s.progressCard}>
        {/* Concentric circles background */}
        <View style={StyleSheet.absoluteFill}>
          <Svg width="100%" height="100%" viewBox="0 0 350 184" style={{ opacity: 0.15 }}>
            <Circle cx="260" cy="92" r="40" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
            <Circle cx="260" cy="92" r="70" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
            <Circle cx="260" cy="92" r="100" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
            <Circle cx="260" cy="92" r="130" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
          </Svg>
        </View>

        <View style={s.progressCardLeft}>
          {/* <Text style={s.progressCardLabel}>Progress</Text> */}
          <Text style={s.progressCardTitle}>Lower Body</Text>
          <Text style={s.progressCardSub}>Cardio · 10 mins</Text>

          <Row style={{ gap: 8, marginTop: 16, alignItems: "center" }}>
            <View style={s.caloriesPill}>
              <Text style={s.caloriesValue}>538</Text>
              <Text style={s.caloriesLabel}>CALORIES</Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} style={s.arrowCircle} onPress={() => openDetail("workout", "progress")}>
              <ArrowUpRight size={16} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </Row>
        </View>

        <View style={s.progressCardRight}>
          <RepRing progress={0.72} size={64} stroke={7} color="#FFFFFF" track="rgba(255,255,255,0.12)">
            <Text style={s.progressRingText}>72%</Text>
          </RepRing>
        </View>
      </View>

      {/* Your Plan Section */}
      <View style={{ marginTop: 6 }}>
        <Text style={s.sectionHeader}>Your plan</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 6 }}>
          {["All workouts", "Lower body", "Upper body"].map((cat) => {
            const active = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.85}
                onPress={() => setSelectedCategory(cat)}
                style={[s.filterChip, active ? s.filterChipActive : s.filterChipInactive]}
              >
                <Text style={[s.filterChipText, active ? s.filterChipTextActive : s.filterChipTextInactive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Workouts List */}
      <View style={{ gap: 14 }}>
        {filteredWorkouts.map((w) => (
          <TouchableOpacity
            key={w.id}
            activeOpacity={0.85}
            onPress={() => openDetail("workout", w.id)}
            style={[s.workoutCard, { backgroundColor: w.backgroundColor }]}
          >
            <View style={StyleSheet.absoluteFill}>
              <Svg width="100%" height="100%" viewBox="0 0 350 180" style={{ opacity: 0.15 }}>
                <Path
                  d="M0 60 C 80 40, 120 120, 200 80 C 260 50, 300 130, 350 110"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <Path
                  d="M0 90 C 90 70, 130 150, 210 110 C 270 80, 310 160, 350 140"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              </Svg>
            </View>

            <View style={s.workoutCardTop}>
              <Text style={s.workoutTitle}>{w.title}</Text>
              <View style={s.durationBadge}>
                <Text style={s.durationVal}>{w.duration.split(" ")[0]}</Text>
                <Text style={s.durationUnit}>{w.duration.split(" ")[1]}</Text>
              </View>
            </View>

            <View style={s.workoutCardBottom}>
              <Row style={{ gap: 6, alignItems: "center" }}>
                <View style={s.workoutTypePill}>
                  <Text style={s.workoutTypePillText}>{w.type}</Text>
                </View>
                <Text style={s.workoutExercisesCount}>{w.exercisesCount}</Text>
              </Row>
              <Text style={s.workoutTags}>{w.tags}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions Links */}
      <View style={{ marginTop: 6 }}>
        <Text style={s.sectionHeader}>Quick Actions</Text>
        <Row style={{ gap: 8, marginTop: 4 }}>
          <IconBtn style={{ flex: 1, backgroundColor: C.surface, borderWidth: 1, borderColor: C.line }} icon={<CalendarDays size={15} color={C.text} />} label="Classes" onPress={() => navigate("classes")} />
          <IconBtn style={{ flex: 1, backgroundColor: C.surface, borderWidth: 1, borderColor: C.line }} icon={<Dumbbell size={15} color={C.text} />} label="Book" onPress={() => navigate("book")} />
          <IconBtn style={{ flex: 1, backgroundColor: C.surface, borderWidth: 1, borderColor: C.line }} icon={<QrCode size={15} color={C.text} />} label="My QR" onPress={() => navigate("qr")} />
        </Row>
      </View>

      {/* Membership Management Button / Collapsible Panel */}
      <View style={{ marginTop: 4, marginBottom: 12 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowMembershipSettings(!showMembershipSettings)}
          style={s.membershipToggleBtn}
        >
          <Text style={s.membershipToggleText}>
            {showMembershipSettings ? "Hide Membership Settings" : "Manage Membership Package"}
          </Text>
          <ChevronRight
            size={16}
            color={C.lime}
            style={{ transform: [{ rotate: showMembershipSettings ? "90deg" : "0deg" }] }}
          />
        </TouchableOpacity>

        {showMembershipSettings && (
          <HeroCard tone={m.frozen ? "dark" : "lime"} style={{ marginTop: 12 }}>
            <RowBetween>
              <View style={{ flex: 1 }}>
                <Text style={[s.heroLabel, { color: m.frozen ? C.muted : "rgba(255,255,255,0.62)" }]}>Membership</Text>
                <Text style={[s.heroPlan, { color: m.frozen ? C.text : "#FFFFFF" }]}>{m.plan}</Text>
                <Text style={[s.heroSubText, { color: m.frozen ? C.muted : "rgba(255,255,255,0.62)" }]}>
                  {m.frozen ? "Frozen · resume anytime" : `Renews ${m.renewDate}`}
                </Text>
              </View>
              <RepRing progress={m.frozen ? 0 : m.daysUsed / m.daysTotal} size={64} stroke={7} color={m.frozen ? C.mutedDark : "#FFFFFF"} track={m.frozen ? C.line : "rgba(255,255,255,0.18)"}>
                {m.frozen ? (
                  <Snowflake size={18} color={C.mutedDark} />
                ) : (
                  <View style={{ alignItems: "center" }}>
                    <Text style={[s.ringNum, { color: "#FFFFFF" }]}>{m.daysTotal - m.daysUsed}</Text>
                    <Text style={[s.ringLabel, { color: "rgba(255,255,255,0.5)" }]}>DAYS</Text>
                  </View>
                )}
              </RepRing>
            </RowBetween>

            <Row style={{ gap: 8, marginTop: 18 }}>
              <Btn
                small
                style={{ flex: 1, backgroundColor: m.frozen ? C.lime : "#FFFFFF" }}
                textStyle={{ color: m.frozen ? "#FFFFFF" : C.lime }}
                onPress={() => dispatch({ type: "TOGGLE_FREEZE" })}
              >
                {m.frozen ? "Resume" : "Freeze"}
              </Btn>
              <Btn
                small
                variant="ghost"
                style={{ flex: 1, backgroundColor: m.frozen ? C.surfaceAlt : "rgba(255,255,255,0.12)", borderWidth: 0 }}
                textStyle={{ color: m.frozen ? C.text : "#FFFFFF" }}
                onPress={() => dispatch({ type: "TOGGLE_AUTORENEW" })}
              >
                Auto-renew {m.autoRenew ? "off" : "on"}
              </Btn>
            </Row>
          </HeroCard>
        )}
      </View>
    </View>
  );
}

function KcalRing({ size = 110, stroke = 14, target = 1200, burned = 328, remaining = 872 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const burnedLen = (burned / target) * c;
  const remainingLen = (remaining / target) * c;
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={C.line} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2} cy={size / 2} r={r}
          stroke="#B9A6F7" strokeWidth={stroke} fill="none"
          strokeDasharray={`${remainingLen} ${c}`}
          strokeDashoffset={0}
          strokeLinecap="round"
        />
        <Circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={C.lime} strokeWidth={stroke} fill="none"
          strokeDasharray={`${burnedLen} ${c}`}
          strokeDashoffset={-remainingLen}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export function ActivityScreen({ state, openDetail }) {
  const [selectedDate, setSelectedDate] = useState(18);
  const [filter, setFilter] = useState("All");
  const [weekIndex, setWeekIndex] = useState(1);
  const week = CALENDAR_WEEKS[weekIndex];

  const filteredHistory = filter === "All" ? ACTIVITY_HISTORY : ACTIVITY_HISTORY.filter((h) => h.type === filter);

  return (
    <View style={{ gap: 14 }}>
      <RowBetween style={{ marginTop: 4 }}>
        <Text style={a.screenTitle}>Your Activity</Text>
        <TouchableOpacity activeOpacity={0.8} style={a.gridBtn} onPress={() => openDetail("classes")}>
          <LayoutGrid size={18} color={C.text} />
        </TouchableOpacity>
      </RowBetween>

      <RowBetween>
        <Text style={a.monthLabel}>{week.month}</Text>
        <Row gap={8}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={a.chevronBtn}
            onPress={() => setWeekIndex((i) => Math.max(0, i - 1))}
          >
            <ChevronLeft size={16} color={C.text} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={a.chevronBtn}
            onPress={() => setWeekIndex((i) => Math.min(CALENDAR_WEEKS.length - 1, i + 1))}
          >
            <ChevronRight size={16} color={C.text} />
          </TouchableOpacity>
        </Row>
      </RowBetween>

      <RowBetween>
        {week.days.map((wd, i) => {
          const active = wd.date === selectedDate;
          return (
            <TouchableOpacity key={`${weekIndex}-${i}`} activeOpacity={0.8} onPress={() => setSelectedDate(wd.date)} style={a.dayCol}>
              <Text style={a.dayLetter}>{wd.d}</Text>
              <View style={[a.dayCircle, active && a.dayCircleActive]}>
                <Text style={[a.dayNum, active && a.dayNumActive]}>{wd.date}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </RowBetween>

      <TouchableOpacity activeOpacity={0.85} style={a.challengeCard} onPress={() => openDetail("challenge")}>
        <View style={{ flex: 1 }}>
          <Text style={a.challengeTitle}>Today's Challenge</Text>
          <Text style={a.challengeSub}>Do your plan before 9:00 AM</Text>
        </View>
      </TouchableOpacity>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {["All", "Running", "Cycling"].map((cat) => {
          const active = filter === cat;
          return (
            <TouchableOpacity
              key={cat}
              activeOpacity={0.85}
              onPress={() => setFilter(cat)}
              style={[s.filterChip, active ? s.filterChipActive : s.filterChipInactive]}
            >
              <Text style={[s.filterChipText, active ? s.filterChipTextActive : s.filterChipTextInactive]}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Row style={{ gap: 12 }}>
        <TouchableOpacity activeOpacity={0.85} style={[a.statTile, { backgroundColor: "#6D4FC7" }]} onPress={() => openDetail("steps")}>
          <Footprints size={22} color="#FFFFFF" />
          <Text style={a.statTileValue}>1840</Text>
          <Text style={a.statTileLabel}>Steps</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} style={[a.statTile, { backgroundColor: "#8B5CF6" }]} onPress={() => openDetail("goals")}>
          <Text style={a.goalsTitle}>My Goals</Text>
          <Text style={a.goalsSub}>Keep it up, you can achieve your goals.</Text>
          <View style={a.goalsBarTrack}>
            <View style={[a.goalsBarFill, { width: "42%" }]} />
          </View>
        </TouchableOpacity>
      </Row>

      <TouchableOpacity activeOpacity={0.85} style={a.kcalCard} onPress={() => openDetail("calories")}>
        <View style={{ gap: 14 }}>
          <View>
            <Row gap={8}><View style={[a.dot, { backgroundColor: C.lime }]} /><Text style={a.kcalValue}>1200 Kcal</Text></Row>
            <Text style={a.kcalLabel}>Target</Text>
          </View>
          <View>
            <Row gap={8}><View style={[a.dot, { backgroundColor: "#6D4FC7" }]} /><Text style={a.kcalValue}>328 Kcal</Text></Row>
            <Text style={a.kcalLabel}>Burned</Text>
          </View>
          <View>
            <Row gap={8}><View style={[a.dot, { backgroundColor: "#B9A6F7" }]} /><Text style={a.kcalValue}>872 Kcal</Text></Row>
            <Text style={a.kcalLabel}>Remaining</Text>
          </View>
        </View>
        <View style={{ position: "relative" }}>
          <KcalRing />
          <View style={[a.ringBadge, { top: -6, right: 30 }]}><Text style={a.ringBadgeText}>1</Text></View>
          <View style={[a.ringBadge, { top: 20, right: -8 }]}><Text style={a.ringBadgeText}>2</Text></View>
          <View style={[a.ringBadge, { bottom: -6, left: 30 }]}><Text style={a.ringBadgeText}>3</Text></View>
        </View>
      </TouchableOpacity>

      <SectionTitle>Recent activity</SectionTitle>
      <Card>
        {filteredHistory.length === 0 && (
          <Text style={{ color: C.mutedDark, fontFamily: FONT.body, fontSize: 11, paddingVertical: 4 }}>
            No {filter.toLowerCase()} activity logged yet.
          </Text>
        )}
        {filteredHistory.map((h, i) => (
          <ListRow key={h.id} last={i === filteredHistory.length - 1}>
            <View style={{ flex: 1 }}>
              <Text style={a.historyTitle}>{h.title}</Text>
              <Text style={a.historyWhen}>{h.type} · {h.when}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={a.historyKcal}>{h.kcal} kcal</Text>
              <Text style={a.historyWhen}>{h.duration}</Text>
            </View>
          </ListRow>
        ))}
      </Card>
    </View>
  );
}

const a = StyleSheet.create({
  screenTitle: { fontFamily: FONT.headingBold, fontSize: 21, color: C.text },
  gridBtn: {
    width: 38, height: 38, borderRadius: 12, backgroundColor: C.surfaceAlt,
    alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: C.line,
  },
  monthLabel: { fontFamily: FONT.bodySemiBold, fontSize: 12.5, color: C.muted },
  chevronBtn: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: C.surfaceAlt,
    alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: C.line,
  },
  dayCol: { alignItems: "center", gap: 8 },
  dayLetter: { fontFamily: FONT.bodyMedium, fontSize: 10, color: C.mutedDark },
  dayCircle: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  dayCircleActive: { backgroundColor: C.lime },
  dayNum: { fontFamily: FONT.bodySemiBold, fontSize: 11.5, color: C.text },
  dayNumActive: { color: "#FFFFFF" },
  challengeCard: {
    backgroundColor: C.lime, borderRadius: 22, padding: 18, minHeight: 84,
    flexDirection: "row", alignItems: "center", overflow: "hidden", gap: 10,
  },
  challengeTitle: { fontFamily: FONT.headingBold, fontSize: 16, color: "#FFFFFF" },
  challengeSub: { fontFamily: FONT.bodyMedium, fontSize: 10.5, color: "rgba(255,255,255,0.65)", marginTop: 4 },
  statTile: { flex: 1, borderRadius: 20, padding: 16, minHeight: 130, justifyContent: "flex-start", gap: 6 },
  statTileValue: { fontFamily: FONT.headingBold, fontSize: 21, color: "#FFFFFF", marginTop: 6 },
  statTileLabel: { fontFamily: FONT.bodyMedium, fontSize: 10.5, color: "rgba(255,255,255,0.65)" },
  goalsTitle: { fontFamily: FONT.headingBold, fontSize: 13, color: "#FFFFFF" },
  goalsSub: { fontFamily: FONT.bodyMedium, fontSize: 9.5, color: "rgba(255,255,255,0.65)", marginTop: 2, lineHeight: 15 },
  goalsBarTrack: { height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.15)", marginTop: 10, overflow: "hidden" },
  goalsBarFill: { height: "100%", borderRadius: 4, backgroundColor: "#FFFFFF" },
  kcalCard: {
    backgroundColor: C.surface, borderWidth: 1, borderColor: C.line, borderRadius: 22,
    padding: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  dot: { width: 8, height: 8, borderRadius: 4, marginTop: 4 },
  kcalValue: { fontFamily: FONT.bodySemiBold, fontSize: 11.5, color: C.text },
  kcalLabel: { fontFamily: FONT.body, fontSize: 9, color: C.mutedDark, marginLeft: 16 },
  ringBadge: {
    position: "absolute", width: 20, height: 20, borderRadius: 10, backgroundColor: C.surfaceAlt,
    borderWidth: 1, borderColor: C.line, alignItems: "center", justifyContent: "center",
  },
  ringBadgeText: { fontFamily: FONT.bodyBold, fontSize: 8.5, color: C.text },
  historyTitle: { fontFamily: FONT.bodySemiBold, fontSize: 12, color: C.text },
  historyWhen: { fontFamily: FONT.body, fontSize: 9.5, color: C.mutedDark, marginTop: 2 },
  historyKcal: { fontFamily: FONT.mono, fontSize: 11, color: C.lime },
});

export function ClassesScreen({ state, dispatch }) {
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? state.classes : state.classes.filter((c) => c.category === filter);
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 8 }}>
        {CATEGORIES.map((cat) => (
          <Chip key={cat} active={filter === cat} onPress={() => setFilter(cat)}>{cat}</Chip>
        ))}
      </ScrollView>
      <View style={{ marginTop: 10 }}>
        {list.map((c) => {
          const isBooked = !!state.bookedClassIds[c.id];
          const isFull = c.filled >= c.cap;
          const isWaitlisted = !!state.waitlistedClassIds[c.id];
          return (
            <Card style={{ marginBottom: 10 }} key={c.id}>
              <Row gap={12}>
                <RepRing progress={c.filled / c.cap} size={44} stroke={4.5} color={isFull ? C.coral : C.lime} />
                <View>
                  <Text style={s.className}>{c.name}</Text>
                  <Text style={s.classMeta}>{c.time} · {c.duration}</Text>
                  <Text style={s.classMeta2}>{c.instructor} · {c.category}</Text>
                </View>
              </Row>
              <RowBetween style={{ marginTop: 12 }}>
                <Text style={s.classCount}>
                  {c.filled}/{c.cap} filled{c.waitlistCount > 0 ? ` · ${c.waitlistCount} waiting` : ""}
                </Text>
                {isBooked ? (
                  <IconBtn variant="ghost" icon={<Check size={13} color={C.text} />} label="Booked · Cancel" onPress={() => dispatch({ type: "CANCEL_CLASS", id: c.id })} />
                ) : isFull ? (
                  <Btn variant="ghost" onPress={() => dispatch({ type: isWaitlisted ? "LEAVE_WAITLIST" : "JOIN_WAITLIST", id: c.id })}>
                    {isWaitlisted ? "Leave waitlist" : "Join waitlist"}
                  </Btn>
                ) : (
                  <Btn onPress={() => dispatch({ type: "BOOK_CLASS", id: c.id })}>Book slot</Btn>
                )}
              </RowBetween>
            </Card>
          );
        })}
      </View>
    </View>
  );
}

export function BookScreen({ state, dispatch, navigate }) {
  const [serviceId, setServiceId] = useState(null);
  const [trainerName, setTrainerName] = useState(null);
  const [slot, setSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const service = state.services.find((sv) => sv.id === serviceId);
  const trainer = service?.trainers.find((t) => t.name === trainerName);
  
  const reset = () => { 
    setServiceId(null); 
    setTrainerName(null); 
    setSlot(null); 
    setConfirmed(false); 
    setBookingId(null);
  };

  const handleBackToDashboard = () => {
    reset();
    if (navigate) navigate("home");
  };

  const getFormattedDate = () => {
    const d = new Date();
    // Simulate tomorrow's date
    const tomorrow = new Date(d.getTime() + 24 * 60 * 60 * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[tomorrow.getDay()]} ${tomorrow.getDate()} ${months[tomorrow.getMonth()]}`;
  };

  const getSlotRange = (startSlot) => {
    if (!startSlot) return "";
    const parts = startSlot.split(" ");
    if (parts.length < 2) return startSlot;
    const timePart = parts[0];
    const ampm = parts[1];
    const timeParts = timePart.split(":");
    let hour = parseInt(timeParts[0]);
    let min = timeParts[1] || "00";
    let endHour = hour + 1;
    let endAmpm = ampm;
    if (endHour === 12) {
      endAmpm = ampm === "AM" ? "PM" : "AM";
    } else if (endHour > 12) {
      endHour -= 12;
    }
    return `${startSlot} – ${endHour}:${min} ${endAmpm}`;
  };

  if (confirmed) {
    const displayId = `#GF-BKG-${bookingId || 959381}`;
    return (
      <View style={s.confirmContainer}>
        {/* Checkmark Icon Container */}
        <View style={s.checkCircleWrapper}>
          <View style={s.checkCircle}>
            <Check size={28} color="#FFFFFF" strokeWidth={3} />
          </View>
        </View>

        {/* Title & Subtitle */}
        <Text style={s.confirmMainTitle}>Booking request submitted</Text>
        <Text style={s.confirmSubTitle}>
          We will review trainer availability and confirm the final price before asking for payment.
        </Text>

        {/* Details Card */}
        <Card style={s.detailsCard}>
          <View style={s.detailsRow}>
            <View style={s.detailsCol}>
              <Text style={s.detailsLabel}>Booking ID</Text>
              <Text style={s.detailsValue}>{displayId}</Text>
            </View>
            <View style={s.detailsCol}>
              <Text style={s.detailsLabel}>Service</Text>
              <Text style={s.detailsValue}>{service?.name}</Text>
            </View>
          </View>

          <View style={[s.detailsRow, { marginTop: 20 }]}>
            <View style={s.detailsCol}>
              <Text style={s.detailsLabel}>Date and arrival</Text>
              <Text style={s.detailsValue}>{getFormattedDate()} · {getSlotRange(slot)}</Text>
            </View>
            <View style={s.detailsCol}>
              <Text style={s.detailsLabel}>Next step</Text>
              <Text style={[s.detailsValue, { color: C.coral }]}>Price review</Text>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={s.btnRow}>
          <Btn variant="coral" style={{ flex: 1 }} onPress={() => navigate && navigate("profile")}>
            Track booking
          </Btn>
          <Btn variant="ghost" style={{ flex: 1 }} onPress={handleBackToDashboard}>
            Back to dashboard
          </Btn>
        </View>
      </View>
    );
  }

  if (service && trainer) {
    return (
      <View>
        <TouchableOpacity onPress={() => setTrainerName(null)} style={[styles.row, { gap: 8, marginVertical: 10 }]}>
          <ChevronLeft size={15} color={C.muted} />
          <Text style={s.crumbText}>{trainerName}</Text>
        </TouchableOpacity>
        <SectionTitle style={{ marginTop: 0 }}>Pick a time</SectionTitle>
        {trainer.slots.length === 0 && <Text style={s.mutedSm}>No open slots left today – check back tomorrow.</Text>}
        <View style={styles.wrapRow}>
          {trainer.slots.map((sl) => (
            <Chip key={sl} active={slot === sl} onPress={() => setSlot(sl)}>{sl}</Chip>
          ))}
        </View>
        <Btn style={{ width: "100%", marginTop: 20 }} disabled={!slot}
          onPress={() => { 
            dispatch({ type: "BOOK_SERVICE", serviceId, serviceName: service.name, trainerName, slot }); 
            setBookingId(Math.floor(100000 + Math.random() * 900000));
            setConfirmed(true); 
          }}>
          Confirm booking
        </Btn>
      </View>
    );
  }

  if (service) {
    return (
      <View>
        <TouchableOpacity onPress={() => setServiceId(null)} style={[styles.row, { gap: 8, marginVertical: 10 }]}>
          <ChevronLeft size={15} color={C.muted} />
          <Text style={s.crumbText}>{service.name}</Text>
        </TouchableOpacity>
        {service.trainers.map((t) => (
          <Card key={t.name} style={{ marginBottom: 10, opacity: t.slots.length ? 1 : 0.55 }} onPress={t.slots.length ? () => setTrainerName(t.name) : undefined}>
            <RowBetween>
              <Row gap={12}>
                <Avatar>{initials(t.name)}</Avatar>
                <View>
                  <Text style={s.rowTitle}>{t.name}</Text>
                  <Text style={s.mutedSm}>{t.slots.length ? `${t.slots.length} slots open today` : "Fully booked today"}</Text>
                </View>
              </Row>
              {t.slots.length > 0 && <ChevronRight size={16} color={C.mutedDark} />}
            </RowBetween>
          </Card>
        ))}
      </View>
    );
  }

  return (
    <View>
      <SectionTitle style={{ marginTop: 8 }}>Book a service</SectionTitle>
      {state.services.map((sv) => {
        const Icon = ICONS[sv.icon];
        return (
          <Card key={sv.id} style={{ marginBottom: 10 }} onPress={() => setServiceId(sv.id)}>
            <RowBetween>
              <Row gap={12}>
                <Avatar><Icon size={17} color={C.lime} /></Avatar>
                <View>
                  <Text style={s.rowTitle}>{sv.name}</Text>
                  <Text style={s.mutedSm}>{sv.blurb}</Text>
                </View>
              </Row>
              <ChevronRight size={16} color={C.mutedDark} />
            </RowBetween>
          </Card>
        );
      })}
    </View>
  );
}

export function QRScreen({ state, dispatch }) {
  const [seed, setSeed] = useState(1);
  const mine = state.checkins.filter((c) => c.member === "Sara Ahmed").slice(0, 5);
  return (
    <View>
      <Card style={{ marginTop: 8, alignItems: "center", paddingVertical: 22, paddingHorizontal: 16 }}>
        <Text style={s.cardLabel}>Digital membership card</Text>
        <Text style={s.memberName}>Sara Ahmed</Text>
        <Text style={s.memberSub}>{state.membership.plan} · #GF-10432</Text>
        <Pulse>
          <FakeQR seed={seed} />
        </Pulse>
        <Row style={{ gap: 8, marginTop: 16, justifyContent: "center" }}>
          <IconBtn variant="ghost" small icon={<RefreshCcw size={13} color={C.text} />} label="Refresh code" onPress={() => setSeed(seed + 1)} />
          <Btn small onPress={() => dispatch({ type: "CHECK_IN", member: "Sara Ahmed", context: "Gym floor" })}>Check in now</Btn>
        </Row>
      </Card>
      <SectionTitle>Recent check-ins</SectionTitle>
      <Card>
        {mine.map((h, i) => (
          <ListRow key={h.id} last={i === mine.length - 1}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.lime }} />
            <View style={{ flex: 1 }}>
              <Text style={s.checkinCtx}>{h.context}</Text>
              <Text style={s.checkinWhen}>{h.when}</Text>
            </View>
          </ListRow>
        ))}
      </Card>
    </View>
  );
}

export function ProfileScreen({ state, dispatch, role, setRole }) {
  const [weightInput, setWeightInput] = useState("");
  const w = state.metrics.weights;
  const bmi = (w[w.length - 1] / (state.metrics.height * state.metrics.height)).toFixed(1);
  const delta = (w[w.length - 1] - w[0]).toFixed(1);
  const maxW = Math.max(...w), minW = Math.min(...w);
  const submitWeight = () => {
    const val = parseFloat(weightInput);
    if (!isNaN(val) && val > 20 && val < 300) { dispatch({ type: "ADD_WEIGHT", value: val }); setWeightInput(""); }
  };
  return (
    <View>
      <Row gap={14} style={{ marginTop: 8 }}>
        <Avatar size={54} radius={16} fontSize={16}>SA</Avatar>
        <View style={{ flex: 1 }}>
          <Text style={s.memberName}>Sara Ahmed</Text>
          <Text style={s.mutedSm}>Member since Jan 2025</Text>
        </View>
        {setRole && (
          <TouchableOpacity
            activeOpacity={0.75}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              backgroundColor: C.surface,
              borderWidth: 1,
              borderColor: C.line,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 100,
            }}
            onPress={() => setRole("trainer")}
          >
            <Text style={{
              color: C.lime,
              fontFamily: FONT.mono,
              fontSize: 9,
              textTransform: "uppercase",
            }}>
              Trainer ⇆
            </Text>
          </TouchableOpacity>
        )}
      </Row>

      <SectionTitle>Body metrics</SectionTitle>
      <Card>
        <RowBetween>
          <View>
            <Text style={s.statBig}>{w[w.length - 1]} kg</Text>
            <Text style={s.statLabel}>WEIGHT ({delta >= 0 ? "+" : ""}{delta}kg since start)</Text>
          </View>
          <View>
            <Text style={s.statBig}>{bmi}</Text>
            <Text style={s.statLabel}>BMI</Text>
          </View>
          <TrendingUp size={22} color={C.lime} />
        </RowBetween>
        <Row style={{ gap: 4, alignItems: "flex-end", height: 36, marginTop: 14 }}>
          {w.map((val, i) => (
            <View key={i} style={{
              flex: 1, backgroundColor: i === w.length - 1 ? C.lime : C.line, borderRadius: 3,
              height: 8 + ((val - minW) / Math.max(0.1, maxW - minW)) * 28,
            }} />
          ))}
        </Row>
        <Row style={{ gap: 8, marginTop: 12 }}>
          <TextInput
            style={s.input}
            placeholder="Log today's weight (kg)"
            placeholderTextColor={C.mutedDark}
            keyboardType="decimal-pad"
            value={weightInput}
            onChangeText={setWeightInput}
            onSubmitEditing={submitWeight}
          />
          <IconBtn small icon={<Plus size={13} color="#FFFFFF" />} label="" onPress={submitWeight} style={{ paddingHorizontal: 14 }} />
        </Row>
      </Card>

      <SectionTitle>Today's workout plan</SectionTitle>
      <Card>
        {state.workoutPlan.map((w2, i) => (
          <ListRow key={i} last={i === state.workoutPlan.length - 1}>
            <View style={{ flex: 1 }}>
              <Text style={s.rowTitle}>{w2.exercise}</Text>
              <Text style={s.rowSub}>{w2.sets}</Text>
            </View>
            <Text style={s.loadText}>{w2.load}</Text>
          </ListRow>
        ))}
      </Card>

      <SectionTitle>Today's diet plan</SectionTitle>
      <Card>
        {state.dietPlan.map((d, i) => (
          <ListRow key={i} last={i === state.dietPlan.length - 1}>
            <Text style={s.mealLabel}>{d.meal}</Text>
            <Text style={s.rowTitle}>{d.item}</Text>
          </ListRow>
        ))}
      </Card>

      <SectionTitle>Booking history</SectionTitle>
      <Card>
        {state.bookings.map((b, i) => (
          <ListRow key={b.id} last={i === state.bookings.length - 1}>
            <View style={{ flex: 1 }}>
              <Text style={s.rowTitle}>{b.title}</Text>
              <Text style={s.rowSub}>{b.when}</Text>
            </View>
            <Badge status={b.status} />
          </ListRow>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  row: { flexDirection: "row", alignItems: "center" },
});

const s = StyleSheet.create({
  heroLabel: { fontFamily: FONT.bodySemiBold, fontSize: 10, textTransform: "uppercase", letterSpacing: 1 },
  heroPlan: { fontFamily: FONT.headingBold, fontSize: 18.5, marginTop: 4 },
  heroSubText: { fontFamily: FONT.body, fontSize: 11, marginTop: 3 },
  mutedSm: { fontFamily: FONT.body, fontSize: 11, color: C.muted, marginTop: 3 },
  ringNum: { fontFamily: FONT.monoSemiBold, fontSize: 13 },
  ringLabel: { fontSize: 8, marginTop: 1 },
  statLabel: { color: C.mutedDark, fontSize: 9, fontFamily: FONT.body },
  rowTitle: { color: C.text, fontSize: 12, fontFamily: FONT.bodySemiBold },
  rowSub: { color: C.muted, fontSize: 10, fontFamily: FONT.body, marginTop: 1 },
  className: { color: C.text, fontSize: 12.5, fontFamily: FONT.bodySemiBold },
  classMeta: { color: C.muted, fontSize: 10, fontFamily: FONT.body, marginTop: 2 },
  classMeta2: { color: C.mutedDark, fontSize: 9.5, fontFamily: FONT.body },
  classCount: { fontFamily: FONT.mono, color: C.mutedDark, fontSize: 9.5 },
  confirmTitle: { color: C.text, fontFamily: FONT.heading, fontSize: 15 },
  crumbText: { color: C.muted, fontSize: 11, fontFamily: FONT.body },
  cardLabel: { color: C.muted, fontSize: 10, textTransform: "uppercase", letterSpacing: 1, fontFamily: FONT.body },
  memberName: { color: C.text, fontFamily: FONT.heading, fontSize: 16.5, marginTop: 4 },
  memberSub: { color: C.limeDim, fontSize: 10.5, marginBottom: 16, fontFamily: FONT.body },
  checkinCtx: { color: C.text, fontSize: 11.5, fontFamily: FONT.body },
  checkinWhen: { color: C.mutedDark, fontSize: 9.5, fontFamily: FONT.body },
  statBig: { fontFamily: FONT.monoSemiBold, color: C.text, fontSize: 15 },
  input: {
    backgroundColor: C.surfaceAlt, borderWidth: 1, borderColor: C.line, borderRadius: 10,
    paddingVertical: 9, paddingHorizontal: 11, color: C.text, fontFamily: FONT.body, fontSize: 11, flex: 1,
  },
  loadText: { fontFamily: FONT.mono, color: C.lime, fontSize: 10.5 },
  mealLabel: { color: C.muted, fontSize: 9.5, width: 70, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: FONT.body },

  progressCard: {
    backgroundColor: C.lime,
    borderRadius: 26,
    paddingHorizontal: 20,
    paddingVertical: 26,
    flexDirection: "row",
    position: "relative",
    overflow: "visible",
    minHeight: 184,
    marginTop: 26,
  },
  progressCardLeft: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 8,
    paddingRight: 14,
    zIndex: 2,
  },
  progressCardRight: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 10,
    zIndex: 2,
  },
  progressCardImage: {
    position: "absolute",
    right: 25,
    bottom: -12,
    width: 180,
    height: 215,
    resizeMode: "contain",
    zIndex: 1,
  },
  progressCardLabel: {
    fontFamily: FONT.bodySemiBold,
    fontSize: 10.5,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.65)",
    letterSpacing: 1,
  },
  progressCardTitle: {
    fontFamily: FONT.headingBold,
    fontSize: 18.5,
    color: "#FFFFFF",
    marginTop: 4,
  },
  progressCardSub: {
    fontFamily: FONT.bodyMedium,
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    marginTop: 2,
  },
  caloriesPill: {
    backgroundColor: C.bg,
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  caloriesValue: {
    color: C.text,
    fontFamily: FONT.headingBold,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  caloriesLabel: {
    color: "rgba(245,243,250,0.45)",
    fontFamily: FONT.bodyBold,
    fontSize: 8,
    marginTop: -1,
  },
  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginTop: -6,
  },
  progressRingText: {
    fontFamily: FONT.headingBold,
    fontSize: 12.5,
    color: "#FFFFFF",
  },
  sectionHeader: {
    fontFamily: FONT.headingBold,
    fontSize: 17.5,
    color: C.text,
    marginVertical: 4,
  },
  filterChip: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filterChipActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  filterChipInactive: {
    backgroundColor: C.surface,
    borderColor: C.line,
  },
  filterChipText: {
    fontFamily: FONT.bodySemiBold,
    fontSize: 11,
  },
  filterChipTextActive: {
    color: "#000000",
  },
  filterChipTextInactive: {
    color: C.muted,
  },
  workoutCard: {
    borderRadius: 24,
    minHeight: 150,
    paddingHorizontal: 20,
    paddingVertical: 22,
    overflow: "hidden",
    position: "relative",
    justifyContent: "space-between",
  },
  workoutCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    zIndex: 2,
  },
  workoutTitle: {
    fontFamily: FONT.headingBold,
    fontSize: 14,
    color: "#FFFFFF",
    flex: 1,
  },
  durationBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: C.text,
    borderWidth: 3,
    borderColor: C.lime,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  durationVal: {
    fontFamily: FONT.headingBold,
    fontSize: 11.5,
    color: C.bg,
    lineHeight: 14,
  },
  durationUnit: {
    fontFamily: FONT.bodyMedium,
    fontSize: 8,
    color: C.bg,
    marginTop: -2,
  },
  workoutCardBottom: {
    alignItems: "flex-start",
    zIndex: 2,
  },
  workoutTypePill: {
    backgroundColor: C.bg,
    borderRadius: 100,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  workoutTypePillText: {
    color: C.text,
    fontFamily: FONT.bodySemiBold,
    fontSize: 9,
    textTransform: "uppercase",
  },
  workoutExercisesCount: {
    fontFamily: FONT.bodySemiBold,
    fontSize: 9.5,
    color: "#FFFFFF",
  },
  workoutTags: {
    fontFamily: FONT.bodyMedium,
    fontSize: 10.5,
    color: "#FFFFFF",
    marginTop: 4,
  },
  membershipToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  membershipToggleText: {
    color: C.text,
    fontFamily: FONT.bodySemiBold,
    fontSize: 11.5,
  },
  confirmContainer: {
    marginTop: 12,
    alignItems: "center",
    paddingHorizontal: 4,
    gap: 16,
  },
  checkCircleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    shadowColor: "#22C55E",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmMainTitle: {
    color: C.text,
    fontFamily: FONT.headingBold,
    fontSize: 20,
    textAlign: "center",
  },
  confirmSubTitle: {
    color: C.muted,
    fontFamily: FONT.body,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  detailsCard: {
    width: "100%",
    backgroundColor: C.surface,
    borderColor: C.line,
    borderWidth: 1,
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsCol: {
    flex: 1,
  },
  detailsLabel: {
    color: C.mutedDark,
    fontFamily: FONT.bodyMedium,
    fontSize: 10,
    textTransform: "capitalize",
    marginBottom: 4,
  },
  detailsValue: {
    color: C.text,
    fontFamily: FONT.bodyBold,
    fontSize: 12.5,
  },
  btnRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    width: "100%",
  },
});
