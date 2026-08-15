import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ScanLine, QrCode, Plus, TrendingUp, X, Users, CalendarCheck, Clock, DollarSign, Star, Award, ArrowLeftRight } from "lucide-react-native";
import { C, FONT } from "../theme";
import ScanLineFx from "../components/ScanLineFx";
import { SCAN_POOL } from "../state/store";
import { TRAINER_PROFILE, TRAINER_STATS, TRAINER_REVIEWS } from "../data/dummy";
import { Card, SectionTitle, RowBetween, Row, Btn, IconBtn, Avatar, ListRow, LinkBtn, initials } from "../components/ui";

export function ScheduleScreen({ state }) {
  return (
    <View>
      <SectionTitle style={{ marginTop: 8 }}>Today, Jul 27</SectionTitle>
      <Card>
        {state.schedule.map((sc, i) => (
          <ListRow key={sc.id} last={i === state.schedule.length - 1}>
            <Text style={s.time}>{sc.time}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.rowTitle}>{sc.title}</Text>
              <Text style={s.rowSub}>{sc.sub}</Text>
            </View>
          </ListRow>
        ))}
      </Card>
    </View>
  );
}

export function ScanScreen({ state, dispatch }) {
  const [scanning, setScanning] = useState(false);
  const [idx, setIdx] = useState(0);
  const recent = state.checkins.slice(0, 6);

  const runScan = () => {
    if (scanning) return;
    setScanning(true);
    setTimeout(() => {
      const name = SCAN_POOL[idx % SCAN_POOL.length];
      setIdx(idx + 1);
      dispatch({ type: "CHECK_IN", member: name, context: "Sunrise Strength" });
      setScanning(false);
    }, 900);
  };

  return (
    <View>
      <View style={s.scanBox}>
        <ScanLine size={40} color={C.mutedDark} />
        {scanning && <ScanLineFx height={190} />}
      </View>
      <IconBtn
        style={{ width: "100%", marginTop: 14 }}
        icon={scanning ? null : <QrCode size={15} color="#FFFFFF" />}
        label={scanning ? "Scanning…" : "Scan member QR"}
        onPress={runScan}
        disabled={scanning}
      />
      <SectionTitle>Recent check-ins</SectionTitle>
      <Card>
        {recent.map((r, i) => (
          <ListRow key={r.id} last={i === recent.length - 1}>
            <Avatar>{initials(r.member)}</Avatar>
            <View style={{ flex: 1 }}>
              <Text style={s.rowTitle}>{r.member}</Text>
              <Text style={s.rowSub}>{r.context}</Text>
            </View>
            <Text style={s.whenText}>{r.when}</Text>
          </ListRow>
        ))}
      </Card>
    </View>
  );
}

const blankExercise = () => ({ exercise: "", sets: "", load: "" });
const blankMeal = () => ({ meal: "", item: "" });

export function ClientsScreen({ state, dispatch }) {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [assigningId, setAssigningId] = useState(null);
  const [workoutDraft, setWorkoutDraft] = useState([]);
  const [dietDraft, setDietDraft] = useState([]);

  const startNote = (cl) => { setEditingNoteId(cl.id); setNoteDraft(cl.note); };
  const saveNote = (id) => { dispatch({ type: "UPDATE_NOTE", clientId: id, note: noteDraft }); setEditingNoteId(null); };

  const startAssign = (cl) => {
    setAssigningId(cl.id);
    setWorkoutDraft(cl.workout.length ? cl.workout.map((w) => ({ ...w })) : [blankExercise()]);
    setDietDraft(cl.diet.length ? cl.diet.map((d) => ({ ...d })) : [blankMeal()]);
  };
  const saveAssign = (id) => {
    dispatch({
      type: "ASSIGN_PLAN", clientId: id,
      workout: workoutDraft.filter((w) => w.exercise.trim()),
      diet: dietDraft.filter((d) => d.meal.trim() || d.item.trim()),
    });
    setAssigningId(null);
  };
  const updateWorkoutRow = (i, field, value) => setWorkoutDraft((rows) => rows.map((r, ri) => (ri === i ? { ...r, [field]: value } : r)));
  const updateDietRow = (i, field, value) => setDietDraft((rows) => rows.map((r, ri) => (ri === i ? { ...r, [field]: value } : r)));
  const removeWorkoutRow = (i) => setWorkoutDraft((rows) => rows.filter((_, ri) => ri !== i));
  const removeDietRow = (i) => setDietDraft((rows) => rows.filter((_, ri) => ri !== i));

  return (
    <View>
      <SectionTitle style={{ marginTop: 8 }}>Your clients</SectionTitle>
      {state.clients.map((c) => (
        <Card style={{ marginBottom: 10 }} key={c.id}>
          <Row gap={12}>
            <Avatar>{initials(c.name)}</Avatar>
            <View>
              <Text style={s.rowTitle}>{c.name}</Text>
              <Text style={s.whenText}>Last visit: {c.last}</Text>
            </View>
          </Row>

          {editingNoteId === c.id ? (
            <View style={{ marginTop: 10 }}>
              <TextInput style={s.textarea} value={noteDraft} onChangeText={setNoteDraft} multiline />
              <Row style={{ gap: 8, marginTop: 8 }}>
                <Btn small style={{ flex: 1 }} onPress={() => saveNote(c.id)}>Save note</Btn>
                <Btn variant="ghost" small style={{ flex: 1 }} onPress={() => setEditingNoteId(null)}>Cancel</Btn>
              </Row>
            </View>
          ) : (
            <Text style={s.noteText} onPress={() => startNote(c)}>{c.note}</Text>
          )}

          {assigningId === c.id ? (
            <View style={{ marginTop: 12 }}>
              <RowBetween>
                <Text style={s.groupLabel}>Workout plan</Text>
                <LinkBtn color={C.coral} onPress={() => setWorkoutDraft((r) => [...r, blankExercise()])}>+ Add exercise</LinkBtn>
              </RowBetween>
              {workoutDraft.map((row, i) => (
                <Row key={i} style={{ gap: 6, marginTop: 6 }}>
                  <TextInput style={[s.input, { flex: 3 }]} placeholder="Exercise" placeholderTextColor={C.mutedDark} value={row.exercise} onChangeText={(v) => updateWorkoutRow(i, "exercise", v)} />
                  <TextInput style={[s.input, { flex: 2 }]} placeholder="Sets" placeholderTextColor={C.mutedDark} value={row.sets} onChangeText={(v) => updateWorkoutRow(i, "sets", v)} />
                  <TextInput style={[s.input, { flex: 2 }]} placeholder="Load" placeholderTextColor={C.mutedDark} value={row.load} onChangeText={(v) => updateWorkoutRow(i, "load", v)} />
                  <TouchableOpacity onPress={() => removeWorkoutRow(i)} style={{ flexShrink: 0, padding: 4 }}>
                    <X size={14} color={C.coral} />
                  </TouchableOpacity>
                </Row>
              ))}

              <RowBetween style={{ marginTop: 14 }}>
                <Text style={s.groupLabel}>Diet plan</Text>
                <LinkBtn color={C.coral} onPress={() => setDietDraft((r) => [...r, blankMeal()])}>+ Add meal</LinkBtn>
              </RowBetween>
              {dietDraft.map((row, i) => (
                <Row key={i} style={{ gap: 6, marginTop: 6 }}>
                  <TextInput style={[s.input, { flex: 2 }]} placeholder="Meal" placeholderTextColor={C.mutedDark} value={row.meal} onChangeText={(v) => updateDietRow(i, "meal", v)} />
                  <TextInput style={[s.input, { flex: 4 }]} placeholder="Notes" placeholderTextColor={C.mutedDark} value={row.item} onChangeText={(v) => updateDietRow(i, "item", v)} />
                  <TouchableOpacity onPress={() => removeDietRow(i)} style={{ flexShrink: 0, padding: 4 }}>
                    <X size={14} color={C.coral} />
                  </TouchableOpacity>
                </Row>
              ))}

              <Row style={{ gap: 8, marginTop: 12 }}>
                <Btn small style={{ flex: 1 }} onPress={() => saveAssign(c.id)}>Save plan</Btn>
                <Btn variant="ghost" small style={{ flex: 1 }} onPress={() => setAssigningId(null)}>Cancel</Btn>
              </Row>
            </View>
          ) : (
            <>
              {c.planAssigned && (
                <View style={s.planBox}>
                  {c.workout.map((w, i) => (
                    <RowBetween key={i} style={{ paddingVertical: 3 }}>
                      <Text style={s.planExercise}>{w.exercise}</Text>
                      <Text style={s.planSets}>{w.sets}{w.load ? ` · ${w.load}` : ""}</Text>
                    </RowBetween>
                  ))}
                  {c.diet.map((d, i) => (
                    <Text key={i} style={s.planDiet}><Text style={{ fontFamily: FONT.bodyBold }}>{d.meal}:</Text> {d.item}</Text>
                  ))}
                </View>
              )}
              <IconBtn
                variant="ghost"
                style={{ marginTop: 12, width: "100%" }}
                icon={c.planAssigned ? <TrendingUp size={13} color={C.text} /> : <Plus size={13} color={C.text} />}
                label={c.planAssigned ? "Edit plan" : "Create plan"}
                onPress={() => startAssign(c)}
              />
            </>
          )}
        </Card>
      ))}
    </View>
  );
}

export function TrainerDashboardScreen({ state }) {
  const stats = TRAINER_STATS;
  const maxCount = Math.max(...stats.weeklySessions.map((d) => d.count), 1);
  return (
    <View>
      <SectionTitle style={{ marginTop: 8 }}>This week</SectionTitle>
      <Row style={{ gap: 10 }}>
        <View style={[d.statTile, { backgroundColor: C.lime }]}>
          <Users size={18} color="#FFFFFF" />
          <Text style={d.statValDark}>{stats.activeClients}</Text>
          <Text style={d.statLabelDark}>Active clients</Text>
        </View>
        <View style={[d.statTile, { backgroundColor: C.surface, borderWidth: 1, borderColor: C.line }]}>
          <CalendarCheck size={18} color={C.lime} />
          <Text style={d.statVal}>{stats.sessionsThisWeek}</Text>
          <Text style={d.statLabel}>Sessions</Text>
        </View>
      </Row>
      <Row style={{ gap: 10, marginTop: 10 }}>
        <View style={[d.statTile, { backgroundColor: C.surface, borderWidth: 1, borderColor: C.line }]}>
          <Clock size={18} color={C.lime} />
          <Text style={d.statVal}>{stats.hoursThisWeek}h</Text>
          <Text style={d.statLabel}>Coaching hours</Text>
        </View>
        <View style={[d.statTile, { backgroundColor: C.surface, borderWidth: 1, borderColor: C.line }]}>
          <DollarSign size={18} color={C.lime} />
          <Text style={d.statVal}>${stats.earningsThisWeek}</Text>
          <Text style={d.statLabel}>Earnings</Text>
        </View>
      </Row>

      <SectionTitle>Sessions per day</SectionTitle>
      <Card>
        <Row style={{ gap: 8, alignItems: "flex-end", height: 90 }}>
          {stats.weeklySessions.map((wd, i) => (
            <View key={i} style={{ flex: 1, alignItems: "center", gap: 6 }}>
              <View style={{ width: "100%", height: 64, justifyContent: "flex-end" }}>
                <View style={{ height: Math.max(4, (wd.count / maxCount) * 64), backgroundColor: wd.count ? C.lime : C.line, borderRadius: 4 }} />
              </View>
              <Text style={d.weekDayLabel}>{wd.day}</Text>
            </View>
          ))}
        </Row>
      </Card>

      <SectionTitle>Recent reviews</SectionTitle>
      <Card>
        {TRAINER_REVIEWS.map((r, i) => (
          <ListRow key={r.id} last={i === TRAINER_REVIEWS.length - 1}>
            <Avatar>{initials(r.member)}</Avatar>
            <View style={{ flex: 1 }}>
              <RowBetween>
                <Text style={s.rowTitle}>{r.member}</Text>
                <Row gap={2}>
                  {Array.from({ length: r.rating }).map((_, si) => (
                    <Star key={si} size={11} color={C.lime} fill={C.lime} />
                  ))}
                </Row>
              </RowBetween>
              <Text style={d.reviewComment}>{r.comment}</Text>
              <Text style={s.whenText}>{r.when}</Text>
            </View>
          </ListRow>
        ))}
      </Card>
    </View>
  );
}

export function TrainerProfileScreen({ role, setRole }) {
  const p = TRAINER_PROFILE;
  return (
    <View>
      <Row gap={14} style={{ marginTop: 8 }}>
        <Avatar size={54} radius={16} fontSize={16}>{initials(p.name)}</Avatar>
        <View style={{ flex: 1 }}>
          <Text style={d.profileName}>{p.name}</Text>
          <Text style={s.whenText}>{p.role}</Text>
        </View>
      </Row>

      {setRole && (
        <TouchableOpacity activeOpacity={0.85} style={d.roleSwitchBtn} onPress={() => setRole("member")}>
          <Text style={d.roleSwitchText}>Switch to Member view</Text>
          <ArrowLeftRight size={14} color={C.lime} />
        </TouchableOpacity>
      )}

      <SectionTitle>About</SectionTitle>
      <Card>
        <Text style={d.bioText}>{p.bio}</Text>
        <RowBetween style={{ marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: C.line }}>
          <View>
            <Row gap={4}><Star size={13} color={C.lime} fill={C.lime} /><Text style={d.ratingVal}>{p.rating}</Text></Row>
            <Text style={s.whenText}>{p.reviewCount} reviews</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={d.ratingVal}>{p.memberSince}</Text>
            <Text style={s.whenText}>Coaching since</Text>
          </View>
        </RowBetween>
      </Card>

      <SectionTitle>Certifications</SectionTitle>
      <Card>
        {p.certifications.map((cert, i) => (
          <ListRow key={cert} last={i === p.certifications.length - 1}>
            <Award size={16} color={C.lime} />
            <Text style={s.rowTitle}>{cert}</Text>
          </ListRow>
        ))}
      </Card>
    </View>
  );
}

const d = StyleSheet.create({
  statTile: { flex: 1, borderRadius: 18, padding: 14, gap: 4 },
  statVal: { fontFamily: FONT.headingBold, fontSize: 16.5, color: C.text, marginTop: 4 },
  statLabel: { fontFamily: FONT.body, fontSize: 9.5, color: C.muted },
  statValDark: { fontFamily: FONT.headingBold, fontSize: 16.5, color: "#FFFFFF", marginTop: 4 },
  statLabelDark: { fontFamily: FONT.body, fontSize: 9.5, color: "rgba(255,255,255,0.65)" },
  weekDayLabel: { fontFamily: FONT.bodyMedium, fontSize: 9, color: C.mutedDark },
  reviewComment: { fontFamily: FONT.body, fontSize: 10.5, color: C.muted, marginTop: 3, lineHeight: 16 },
  profileName: { fontFamily: FONT.headingBold, fontSize: 16, color: C.text },
  roleSwitchBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    marginTop: 14, paddingVertical: 12, borderRadius: 14,
    backgroundColor: C.surface, borderWidth: 1, borderColor: C.line,
  },
  roleSwitchText: { fontFamily: FONT.bodySemiBold, fontSize: 11, color: C.text },
  bioText: { fontFamily: FONT.body, fontSize: 11, color: C.muted, lineHeight: 18 },
  ratingVal: { fontFamily: FONT.bodySemiBold, fontSize: 12.5, color: C.text },
});

const s = StyleSheet.create({
  time: { fontFamily: FONT.mono, color: C.lime, fontSize: 10.5, width: 66 },
  rowTitle: { color: C.text, fontSize: 11.5, fontFamily: FONT.bodySemiBold },
  rowSub: { color: C.mutedDark, fontSize: 9.5, fontFamily: FONT.body },
  whenText: { color: C.muted, fontSize: 9.5, fontFamily: FONT.mono },
  scanBox: {
    marginTop: 10, height: 190, borderRadius: 18, backgroundColor: C.surface, borderWidth: 1, borderColor: C.line,
    overflow: "hidden", alignItems: "center", justifyContent: "center",
  },
  noteText: { color: C.muted, fontSize: 10.5, marginTop: 10, lineHeight: 17, fontFamily: FONT.body },
  groupLabel: { color: C.mutedDark, fontSize: 9, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: FONT.body },
  input: {
    backgroundColor: C.surfaceAlt, borderWidth: 1, borderColor: C.line, borderRadius: 10,
    paddingVertical: 9, paddingHorizontal: 11, color: C.text, fontFamily: FONT.body, fontSize: 11,
  },
  textarea: {
    backgroundColor: C.surfaceAlt, borderWidth: 1, borderColor: C.line, borderRadius: 10,
    padding: 11, color: C.text, fontFamily: FONT.body, fontSize: 11, minHeight: 64, textAlignVertical: "top",
  },
  planBox: { marginTop: 10, backgroundColor: C.surfaceAlt, borderWidth: 1, borderColor: C.line, borderRadius: 12, padding: 10 },
  planExercise: { color: C.text, fontSize: 10, fontFamily: FONT.body },
  planSets: { fontFamily: FONT.mono, color: C.muted, fontSize: 9.5 },
  planDiet: { color: C.limeDim, fontSize: 10, paddingVertical: 3, fontFamily: FONT.body },
});
