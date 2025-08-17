// components/Card.tsx
import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { colors, radius, shadow } from "../theme";

export default function Card({ style, ...props }: ViewProps) {
  return <View {...props} style={[styles.card, style]} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xxl,
    padding: 16,
    ...shadow,
  },
});
