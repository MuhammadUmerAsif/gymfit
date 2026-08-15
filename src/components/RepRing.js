import React from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { C } from "../theme";

export default function RepRing({ progress = 0.5, size = 60, stroke = 6, color = C.lime, track = C.line, children }) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, progress));
  const offset = circumference * (1 - clamped);
  return (
    <View style={{ width: size, height: size, flexShrink: 0 }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center" }}>
        {children}
      </View>
    </View>
  );
}
