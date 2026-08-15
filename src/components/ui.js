import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { C, FONT, RADIUS } from "../theme";

export const initials = (n) => n.split(" ").map((p) => p[0]).slice(0, 2).join("");

export function Card({ style, children, onPress }) {
  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[s.card, style]}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[s.card, style]}>{children}</View>;
}

const HERO_VARIANTS = {
  lime: { bg: C.lime, fg: "#FFFFFF", sub: "rgba(255,255,255,0.62)", ring: "rgba(255,255,255,0.16)" },
  coral: { bg: C.coral, fg: "#1A0B06", sub: "rgba(26,11,6,0.6)", ring: "rgba(26,11,6,0.16)" },
  dark: { bg: C.surfaceAlt, fg: C.text, sub: C.muted, ring: C.line },
};

// Bento-style solid color hero card (mirrors the reference design's "Progress" card).
export function HeroCard({ style, children, tone = "lime", onPress }) {
  const v = HERO_VARIANTS[tone] || HERO_VARIANTS.lime;
  const Wrap = onPress ? TouchableOpacity : View;
  return (
    <Wrap activeOpacity={0.9} onPress={onPress} style={[s.hero, { backgroundColor: v.bg }, style]}>
      {children}
    </Wrap>
  );
}
export const heroTone = (tone) => HERO_VARIANTS[tone] || HERO_VARIANTS.lime;

// Small colored stat block (mirrors the reference design's "Steps" / "My Goals" tiles).
export function StatTile({ label, value, sub, tone = "dark", style, children }) {
  const v = HERO_VARIANTS[tone] || HERO_VARIANTS.dark;
  return (
    <View style={[s.statTile, { backgroundColor: v.bg }, style]}>
      {value != null && <Text style={[s.statTileValue, { color: v.fg }]}>{value}</Text>}
      {label && <Text style={[s.statTileLabel, { color: v.sub }]}>{label}</Text>}
      {sub && <Text style={[s.statTileSub, { color: v.sub }]}>{sub}</Text>}
      {children}
    </View>
  );
}

export function SectionTitle({ children, style, right }) {
  return (
    <View style={[s.sectionTitleRow, style]}>
      <Text style={s.sectionTitleText}>{children}</Text>
      {right}
    </View>
  );
}

export function ScreenHeading({ children, style }) {
  return <Text style={[s.screenHeading, style]}>{children}</Text>;
}

export function RowBetween({ style, children }) {
  return <View style={[s.row, s.between, style]}>{children}</View>;
}

export function Row({ style, children, gap }) {
  return <View style={[s.row, gap != null && { gap }, style]}>{children}</View>;
}

const VARIANTS = {
  primary: { bg: C.lime, color: "#FFFFFF" },
  ghost: { bg: C.surfaceAlt, color: C.text, borderColor: C.line },
  coral: { bg: C.coral, color: "#1A0B06" },
};

export function Btn({ children, onPress, variant = "primary", disabled, small, style, textStyle }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const disabledBg = variant === "primary" ? C.line : C.surfaceAlt;
  const disabledColor = C.mutedDark;
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled}
      onPress={onPress}
      style={[
        s.btn,
        small && s.btnSm,
        { backgroundColor: disabled ? disabledBg : v.bg, borderColor: v.borderColor || "transparent", borderWidth: v.borderColor ? 1 : 0 },
        style,
      ]}
    >
      <Text style={[s.btnText, { color: disabled ? disabledColor : v.color }, small && s.btnTextSm, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export function IconBtn({ icon, label, onPress, variant = "primary", disabled, small, style }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const disabledBg = variant === "primary" ? C.line : C.surfaceAlt;
  const disabledColor = C.mutedDark;
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled}
      onPress={onPress}
      style={[
        s.btn,
        small && s.btnSm,
        { backgroundColor: disabled ? disabledBg : v.bg, borderColor: v.borderColor || "transparent", borderWidth: v.borderColor ? 1 : 0, flexDirection: "row", gap: 6 },
        style,
      ]}
    >
      {icon}
      {!!label && <Text style={[s.btnText, { color: disabled ? disabledColor : v.color }, small && s.btnTextSm]}>{label}</Text>}
    </TouchableOpacity>
  );
}

export function Chip({ children, active, onPress, disabled, style }) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled}
      onPress={onPress}
      style={[s.chip, active && s.chipActive, disabled && s.chipDisabled, style]}
    >
      <Text style={[s.chipText, active && s.chipTextActive]}>{children}</Text>
    </TouchableOpacity>
  );
}

export function Avatar({ children, size = 40, radius = RADIUS.avatar, fontSize = 12.5, style }) {
  return (
    <View style={[s.avatar, { width: size, height: size, borderRadius: radius }, style]}>
      {typeof children === "string" ? (
        <Text style={[s.avatarText, { fontSize }]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

export function ListRow({ children, last, style }) {
  return <View style={[s.listRow, last && { borderBottomWidth: 0 }, style]}>{children}</View>;
}

const BADGE_VARIANTS = {
  upcoming: { bg: "rgba(139,92,246,0.15)", color: C.lime },
  cancelled: { bg: "rgba(255,93,58,0.15)", color: C.coral },
  completed: { bg: "rgba(140,154,137,0.18)", color: C.muted },
};

export function Badge({ status }) {
  const v = BADGE_VARIANTS[status] || BADGE_VARIANTS.completed;
  return (
    <View style={[s.badge, { backgroundColor: v.bg }]}>
      <Text style={[s.badgeText, { color: v.color }]}>{status}</Text>
    </View>
  );
}

export function LinkBtn({ children, onPress, style, color = C.coral }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={[s.link, { color }]}>{children}</Text>
    </TouchableOpacity>
  );
}

export function Toast({ text }) {
  if (!text) return null;
  return (
    <View style={s.toast}>
      <Text style={s.toastText}>{text}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.line,
    borderRadius: RADIUS.card,
    padding: 18,
  },
  hero: {
    borderRadius: RADIUS.hero,
    padding: 18,
  },
  statTile: {
    borderRadius: 20,
    padding: 14,
    flex: 1,
    borderWidth: 1,
    borderColor: C.line,
  },
  statTileValue: { fontFamily: FONT.headingBold, fontSize: 19.5 },
  statTileLabel: { fontFamily: FONT.bodyMedium, fontSize: 10, marginTop: 2 },
  statTileSub: { fontFamily: FONT.body, fontSize: 9.5, marginTop: 4, lineHeight: 15 },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitleText: {
    fontFamily: FONT.headingBold,
    fontSize: 16.5,
    color: C.text,
  },
  screenHeading: {
    fontFamily: FONT.headingBold,
    fontSize: 23,
    color: C.text,
  },
  row: { flexDirection: "row", alignItems: "center" },
  between: { justifyContent: "space-between" },
  btn: {
    borderRadius: RADIUS.pill,
    paddingVertical: 13,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSm: { paddingVertical: 10, paddingHorizontal: 13 },
  btnText: { fontFamily: FONT.bodySemiBold, fontSize: 11.5 },
  btnTextSm: { fontSize: 10.5 },
  chip: {
    backgroundColor: C.surfaceAlt,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: RADIUS.chip,
    borderWidth: 1,
    borderColor: C.line,
  },
  chipActive: { backgroundColor: "#FFFFFF", borderColor: "#FFFFFF" },
  chipText: { fontFamily: FONT.bodySemiBold, fontSize: 11, color: C.muted },
  chipTextActive: { color: "#000000" },
  chipDisabled: { opacity: 0.4 },
  avatar: {
    backgroundColor: C.surfaceAlt,
    borderWidth: 1,
    borderColor: C.line,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: FONT.heading, color: C.lime },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: C.line,
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  badgeText: {
    fontFamily: FONT.mono,
    fontSize: 8.5,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  link: { fontFamily: FONT.bodySemiBold, fontSize: 10 },
  toast: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 108,
    backgroundColor: C.lime,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
    zIndex: 5,
  },
  toastText: { fontFamily: FONT.bodySemiBold, fontSize: 11, color: "#FFFFFF" },
});
