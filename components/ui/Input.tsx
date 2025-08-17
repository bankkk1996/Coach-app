// components/ui/Input.tsx
import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { colors, radius } from "../../theme";

export function Input(props: TextInputProps) {
  return <TextInput {...props} style={[styles.input, props.style]} placeholderTextColor={colors.subtext} />;
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    paddingHorizontal: 12, paddingVertical: 10, color: colors.text, backgroundColor: "#fff",
  },
});
