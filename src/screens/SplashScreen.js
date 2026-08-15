import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import { C, FONT } from "../theme";

const LINE_DURATION_MS = 1800;

export default function SplashScreen({ onFinish }) {
  const lineWidth = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(logoScale, { toValue: 1, duration: 450, useNativeDriver: true }),
    ]).start();

    Animated.timing(lineWidth, {
      toValue: 100,
      duration: LINE_DURATION_MS,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) onFinish?.();
    });
  }, []);

  return (
    <View style={s.root}>
      <View style={s.center}>
        <Animated.Image
          source={require("../../assets/logo.png")}
          style={[s.logo, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
          resizeMode="contain"
        />
        <Text style={s.wordmark}>
          GYM<Text style={s.wordmarkAccent}>FIT</Text>
        </Text>
        <Text style={s.tagline}>Train. Track. Transform.</Text>
      </View>

      <View style={s.lineTrack}>
        <Animated.View
          style={[
            s.lineFill,
            { width: lineWidth.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) },
          ]}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg, alignItems: "center", justifyContent: "center" },
  center: { alignItems: "center" },
  logo: { width: 120, height: 120, borderRadius: 28 },
  wordmark: {
    fontFamily: FONT.headingBold,
    fontSize: 26.5,
    color: C.text,
    marginTop: 22,
    letterSpacing: 1,
  },
  wordmarkAccent: { color: C.lime },
  tagline: {
    fontFamily: FONT.body,
    fontSize: 11,
    color: C.muted,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  lineTrack: {
    position: "absolute",
    bottom: 70,
    width: 140,
    height: 4,
    borderRadius: 2,
    backgroundColor: C.surfaceAlt,
    overflow: "hidden",
  },
  lineFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: C.lime,
  },
});
