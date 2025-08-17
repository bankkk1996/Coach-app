// components/SectionHeader.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string; }) {
  return (
    <View style={styles.wrap}>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { marginTop: 8 },
  sub: { color: colors.subtext, fontSize: 12 },
  title: { color: colors.text, fontSize: 22, fontWeight: "700" },
});
