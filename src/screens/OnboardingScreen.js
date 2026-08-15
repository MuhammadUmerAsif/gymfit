import React from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions, StyleSheet } from "react-native";
import { C, FONT } from "../theme";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function OnboardingScreen({ onFinish }) {
  const { width, height } = useWindowDimensions();
  const isNarrow = width < 360;
  const collageHeight = clamp(height * 0.42, 260, 380);
  const headlineSize = isNarrow ? 23 : 26.5;

  return (
    <View style={s.root}>
      <View style={[s.container, { paddingTop: height < 700 ? 28 : 44 }]}>
        <Text style={s.kicker}>GYMFIT · TRAIN SMARTER</Text>
        <Text style={[s.headline, { fontSize: headlineSize }]}>LEVEL UP YOUR{"\n"}BODY GOALS</Text>

        <View style={[s.collage, { height: collageHeight }]}>
          <View style={[s.photoCard, s.photoLeft]}>
            <Image source={require("../../assets/image1.png")} style={s.photoImg} resizeMode="cover" />
          </View>
          <View style={[s.photoCard, s.photoRight]}>
            <Image source={require("../../assets/Image2.png")} style={s.photoImg} resizeMode="cover" />
          </View>
          <View style={[s.photoCard, s.photoCenter]}>
            <Image source={require("../../assets/Image3.png")} style={s.photoImg} resizeMode="cover" />
            <View style={s.photoFade} />
          </View>
        </View>

        <View style={{ flex: 1, minHeight: 20 }} />

        <TouchableOpacity activeOpacity={0.85} style={s.cta} onPress={onFinish}>
          <Text style={s.ctaText}>START BUILDING YOUR BODY</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={s.secondaryRow} onPress={onFinish}>
          <Text style={s.secondaryText}>
            Already a member? <Text style={s.secondaryLink}>SIGN IN</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  container: { flex: 1, paddingHorizontal: 24, paddingBottom: 28, alignItems: "center" },
  kicker: {
    fontFamily: FONT.bodySemiBold, fontSize: 9.5, color: C.lime,
    letterSpacing: 2, textTransform: "uppercase",
  },
  headline: {
    fontFamily: FONT.headingBold, color: C.text, textAlign: "center",
    marginTop: 10, lineHeight: 36, letterSpacing: 0.5,
  },
  collage: {
    width: "100%",
    marginTop: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  photoCard: {
    position: "absolute",
    width: "58%",
    height: "88%",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.line,
  },
  photoLeft: {
    left: "2%",
    transform: [{ rotate: "-8deg" }],
    zIndex: 1,
  },
  photoRight: {
    right: "2%",
    transform: [{ rotate: "8deg" }],
    zIndex: 1,
  },
  photoCenter: {
    zIndex: 2,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  photoImg: { width: "100%", height: "100%" },
  photoFade: {
    position: "absolute", left: 0, right: 0, bottom: 0, height: "35%",
    backgroundColor: C.bg, opacity: 0.001,
  },
  cta: {
    width: "100%",
    height: 56,
    borderRadius: 100,
    backgroundColor: C.lime,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    shadowColor: C.lime, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 8,
  },
  ctaText: { fontFamily: FONT.bodyBold, fontSize: 11.5, color: "#FFFFFF", letterSpacing: 0.5 },
  secondaryRow: { marginTop: 16 },
  secondaryText: { fontFamily: FONT.body, fontSize: 10.5, color: C.muted },
  secondaryLink: { fontFamily: FONT.bodyBold, color: C.text, textDecorationLine: "underline" },
});
