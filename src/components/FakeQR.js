import React, { useMemo, useRef, useEffect } from "react";
import { Animated } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { C } from "../theme";

export function FakeQR({ seed = 1, size = 168 }) {
  const n = 21;
  const cells = useMemo(() => {
    let s = seed * 9301 + 1;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    const grid = Array.from({ length: n }, () => Array.from({ length: n }, () => rand() > 0.52));
    const stampFinder = (r0, c0) => {
      for (let r = 0; r < 7; r++)
        for (let c = 0; c < 7; c++) {
          const border = r === 0 || r === 6 || c === 0 || c === 6;
          const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          grid[r0 + r][c0 + c] = border || inner;
        }
    };
    stampFinder(0, 0);
    stampFinder(0, n - 7);
    stampFinder(n - 7, 0);
    return grid;
  }, [seed]);
  const cell = size / n;
  return (
    <Svg width={size} height={size} style={{ backgroundColor: "#F3F6EF", borderRadius: 10 }}>
      {cells.map((row, r) =>
        row.map(
          (on, c) =>
            on && (
              <Rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#0E120D" />
            )
        )
      )}
    </Svg>
  );
}

export function Pulse({ children }) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.12, duration: 900, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 900, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0, duration: 900, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.35, duration: 0, useNativeDriver: true }),
        ]),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scale, opacity]);

  return (
    <Animated.View style={{ alignSelf: "center" }}>
      <Animated.View
        style={{
          position: "absolute",
          top: -6,
          left: -6,
          right: -6,
          bottom: -6,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: C.lime,
          opacity,
          transform: [{ scale }],
        }}
      />
      {children}
    </Animated.View>
  );
}
