import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronLeft, Check, Circle, Flame, Target, Footprints } from "lucide-react-native";
import { C, FONT } from "../theme";
import { Card, RowBetween, Row } from "../components/ui";
import RepRing from "../components/RepRing";
import {
  NOTIFICATIONS, WORKOUT_DETAILS, TODAYS_CHALLENGE,
  STEPS_DETAIL, GOALS_DETAIL, CALORIES_DETAIL,
} from "../data/dummy";
import { ClassesScreen } from "./MemberScreens";

function DetailHeader({ title, onBack }) {
  return (
    <View style={s.header}>
      <TouchableOpacity activeOpacity={0.8} style={s.backBtn} onPress={onBack}>
        <ChevronLeft size={18} color={C.text} />
      </TouchableOpacity>
      <Text style={s.headerTitle}>{title}</Text>
      <View style={{ width: 36 }} />
    </View>
  );
}

function NotificationsDetail() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Card>
        {NOTIFICATIONS.map((n, i) => (
          <View key={n.id} style={[s.notifRow, i === NOTIFICATIONS.length - 1 && { borderBottomWidth: 0 }]}>
            <View style={[s.notifDot, { backgroundColor: n.read ? C.mutedDark : C.lime }]} />
            <View style={{ flex: 1 }}>
              <Text style={s.notifTitle}>{n.title}</Text>
              <Text style={s.notifBody}>{n.body}</Text>
              <Text style={s.notifWhen}>{n.when}</Text>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

function WorkoutDetail({ payload }) {
  const w = WORKOUT_DETAILS[payload] || WORKOUT_DETAILS.lower_body;
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Card style={{ backgroundColor: C.lime, borderWidth: 0 }}>
        <Text style={s.workoutHeroTitle}>{w.title}</Text>
        <Row gap={16} style={{ marginTop: 10 }}>
          <View><Text style={s.heroStatVal}>{w.duration}</Text><Text style={s.heroStatLabel}>DURATION</Text></View>
          <View><Text style={s.heroStatVal}>{w.kcal}</Text><Text style={s.heroStatLabel}>KCAL</Text></View>
          <View><Text style={s.heroStatVal}>{w.level}</Text><Text style={s.heroStatLabel}>LEVEL</Text></View>
        </Row>
        <Text style={s.equipmentText}>Equipment: {w.equipment}</Text>
      </Card>

      <Text style={s.sectionLabel}>Exercises</Text>
      <Card>
        {w.exercises.map((ex, i) => (
          <View key={i} style={[s.exRow, i === w.exercises.length - 1 && { borderBottomWidth: 0 }]}>
            <View style={s.exNumCircle}><Text style={s.exNum}>{i + 1}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.exName}>{ex.name}</Text>
              <Text style={s.exMeta}>{ex.sets} sets · {ex.reps} · rest {ex.rest}</Text>
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

function ChallengeDetail() {
  const c = TODAYS_CHALLENGE;
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Card style={{ backgroundColor: C.lime, borderWidth: 0 }}>
        <Text style={s.workoutHeroTitle}>{c.title}</Text>
        <Text style={s.challengeDeadline}>Complete before {c.deadline} · {c.reward}</Text>
        <Text style={s.challengeDesc}>{c.description}</Text>
      </Card>
      <Text style={s.sectionLabel}>Steps</Text>
      <Card>
        {c.steps.map((step, i) => (
          <View key={i} style={[s.exRow, i === c.steps.length - 1 && { borderBottomWidth: 0 }]}>
            {step.done ? (
              <View style={[s.checkCircle, { backgroundColor: C.lime }]}><Check size={13} color="#FFFFFF" /></View>
            ) : (
              <View style={s.checkCircle}><Circle size={12} color={C.mutedDark} /></View>
            )}
            <Text style={[s.exName, step.done && { color: C.mutedDark, textDecorationLine: "line-through" }]}>{step.label}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

function StepsDetail() {
  const d = STEPS_DETAIL;
  const maxSteps = Math.max(...d.weekly.map((w) => w.steps), 1);
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Card style={{ alignItems: "center" }}>
        <Footprints size={26} color={C.lime} />
        <Text style={s.bigStatVal}>{d.today.toLocaleString()}</Text>
        <Text style={s.bigStatLabel}>of {d.goal.toLocaleString()} steps goal</Text>
      </Card>
      <Text style={s.sectionLabel}>This week</Text>
      <Card>
        <Row style={{ gap: 8, alignItems: "flex-end", height: 100 }}>
          {d.weekly.map((wd, i) => (
            <View key={i} style={{ flex: 1, alignItems: "center", gap: 6 }}>
              <View style={{ width: "100%", height: 70, justifyContent: "flex-end" }}>
                <View style={{ height: Math.max(4, (wd.steps / maxSteps) * 70), backgroundColor: wd.steps ? C.lime : C.line, borderRadius: 4 }} />
              </View>
              <Text style={s.weekDayLabel}>{wd.day}</Text>
            </View>
          ))}
        </Row>
      </Card>
    </ScrollView>
  );
}

function GoalsDetail() {
  const d = GOALS_DETAIL;
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Card style={{ alignItems: "center" }}>
        <Target size={26} color="#B9A6F7" />
        <Text style={s.bigStatVal}>{d.progress}%</Text>
        <Text style={s.bigStatLabel}>Overall goal progress</Text>
      </Card>
      <Text style={s.sectionLabel}>Your goals</Text>
      <Card>
        {d.goals.map((g, i) => (
          <View key={g.id} style={[s.goalRow, i === d.goals.length - 1 && { borderBottomWidth: 0 }]}>
            <RowBetween>
              <Text style={s.exName}>{g.label}</Text>
              <Text style={s.goalPct}>{g.progress}%</Text>
            </RowBetween>
            <View style={s.goalTrack}>
              <View style={[s.goalFill, { width: `${g.progress}%` }]} />
            </View>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

function CaloriesDetail() {
  const d = CALORIES_DETAIL;
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <Card style={{ alignItems: "center" }}>
        <RepRing progress={d.burned / d.target} size={90} stroke={10} color={C.lime} track={C.line}>
          <View style={{ alignItems: "center" }}>
            <Flame size={16} color={C.coral} />
            <Text style={s.ringVal}>{d.burned}</Text>
          </View>
        </RepRing>
        <Text style={[s.bigStatLabel, { marginTop: 10 }]}>{d.burned} / {d.target} kcal burned · {d.remaining} remaining</Text>
      </Card>
      <Text style={s.sectionLabel}>Breakdown</Text>
      <Card>
        {d.breakdown.map((b, i) => (
          <View key={i} style={[s.exRow, i === d.breakdown.length - 1 && { borderBottomWidth: 0 }]}>
            <View style={{ flex: 1 }}>
              <Text style={s.exName}>{b.label}</Text>
              <Text style={s.exMeta}>{b.when}</Text>
            </View>
            <Text style={s.kcalTag}>{b.kcal} kcal</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const TITLES = {
  notifications: "Notifications",
  workout: "Workout Detail",
  challenge: "Today's Challenge",
  steps: "Steps",
  goals: "My Goals",
  calories: "Calories",
  classes: "All Classes",
};

export default function DetailScreen({ detail, onBack, state, dispatch, bottomInset }) {
  const { type, payload } = detail;
  return (
    <View style={{ flex: 1 }}>
      <DetailHeader title={TITLES[type] || "Details"} onBack={onBack} />
      <View style={{ flex: 1, paddingBottom: bottomInset }}>
        {type === "notifications" && <NotificationsDetail />}
        {type === "workout" && <WorkoutDetail payload={payload} />}
        {type === "challenge" && <ChallengeDetail />}
        {type === "steps" && <StepsDetail />}
        {type === "goals" && <GoalsDetail />}
        {type === "calories" && <CaloriesDetail />}
        {type === "classes" && (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
            <ClassesScreen state={state} dispatch={dispatch} />
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingTop: 8, paddingBottom: 14,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: C.surfaceAlt,
    borderWidth: 1, borderColor: C.line, alignItems: "center", justifyContent: "center",
  },
  headerTitle: { fontFamily: FONT.headingBold, fontSize: 15, color: C.text },
  content: { paddingHorizontal: 20, paddingBottom: 32, gap: 12 },
  notifRow: { flexDirection: "row", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.line },
  notifDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5 },
  notifTitle: { fontFamily: FONT.bodySemiBold, fontSize: 12, color: C.text },
  notifBody: { fontFamily: FONT.body, fontSize: 10.5, color: C.muted, marginTop: 2, lineHeight: 16 },
  notifWhen: { fontFamily: FONT.mono, fontSize: 9, color: C.mutedDark, marginTop: 4 },
  workoutHeroTitle: { fontFamily: FONT.headingBold, fontSize: 17.5, color: "#FFFFFF" },
  heroStatVal: { fontFamily: FONT.headingBold, fontSize: 13, color: "#FFFFFF" },
  heroStatLabel: { fontFamily: FONT.body, fontSize: 8.5, color: "rgba(255,255,255,0.6)", marginTop: 1 },
  equipmentText: { fontFamily: FONT.bodyMedium, fontSize: 10, color: "rgba(255,255,255,0.65)", marginTop: 12 },
  sectionLabel: { fontFamily: FONT.headingBold, fontSize: 14, color: C.text, marginTop: 4 },
  exRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.line },
  exNumCircle: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.surfaceAlt, alignItems: "center", justifyContent: "center" },
  exNum: { fontFamily: FONT.bodySemiBold, fontSize: 9.5, color: C.lime },
  exName: { fontFamily: FONT.bodySemiBold, fontSize: 12, color: C.text },
  exMeta: { fontFamily: FONT.body, fontSize: 10, color: C.muted, marginTop: 2 },
  kcalTag: { fontFamily: FONT.mono, fontSize: 10, color: C.lime },
  challengeDeadline: { fontFamily: FONT.bodySemiBold, fontSize: 10.5, color: "rgba(255,255,255,0.7)", marginTop: 4 },
  challengeDesc: { fontFamily: FONT.body, fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 10, lineHeight: 18 },
  checkCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: C.line, alignItems: "center", justifyContent: "center" },
  bigStatVal: { fontFamily: FONT.headingBold, fontSize: 23, color: C.text, marginTop: 8 },
  bigStatLabel: { fontFamily: FONT.body, fontSize: 10.5, color: C.muted, marginTop: 2 },
  weekDayLabel: { fontFamily: FONT.bodyMedium, fontSize: 9, color: C.mutedDark },
  goalRow: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.line, gap: 8 },
  goalPct: { fontFamily: FONT.mono, fontSize: 10, color: "#B9A6F7" },
  goalTrack: { height: 6, borderRadius: 3, backgroundColor: C.line, overflow: "hidden" },
  goalFill: { height: "100%", borderRadius: 3, backgroundColor: "#B9A6F7" },
  ringVal: { fontFamily: FONT.headingBold, fontSize: 14, color: C.text, marginTop: 2 },
});
