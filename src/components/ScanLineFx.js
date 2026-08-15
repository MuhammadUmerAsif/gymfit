import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { C } from "../theme";

export default function ScanLineFx({ height = 190 }) {
  const y = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(y, { toValue: 1, duration: 1100, useNativeDriver: true }),
        Animated.timing(y, { toValue: 0, duration: 1100, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [y]);

  const translateY = y.interpolate({ inputRange: [0, 1], outputRange: [height * 0.08, height * 0.88] });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: "6%",
        right: "6%",
        height: 2,
        backgroundColor: C.lime,
        shadowColor: C.lime,
        shadowOpacity: 0.7,
        shadowRadius: 10,
        transform: [{ translateY }],
      }}
    />
  );
}
