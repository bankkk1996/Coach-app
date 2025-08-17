// components/ui/Button.tsx
import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
  View,
} from "react-native";
import { colors, radius } from "../../theme";

type Variant = "solid" | "subtle" | "ghost";

type Props = {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function Button({
  title,
  onPress,
  variant = "solid",
  disabled = false,
  style,
  leftIcon,
  rightIcon,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.btn,
        variant === "solid" && styles.solid,
        variant === "subtle" && styles.subtle,
        variant === "ghost" && styles.ghost,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={styles.centerRow}>
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        <Text
          style={[
            styles.text,
            variant === "solid" ? styles.textOnSolid : styles.textDefault,
            disabled && styles.textDisabled,
          ]}
        >
          {title}
        </Text>
        {rightIcon ? <View style={styles.icon}>{rightIcon}</View> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    borderWidth: 0,
  },
  solid: {
    backgroundColor: colors.primary,
  },
  subtle: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
  },
  textOnSolid: {
    color: "#fff",
  },
  textDefault: {
    color: "#111827",
  },
  textDisabled: {
    // color will inherit; keep opacity from container
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    marginHorizontal: 2,
  },
});

export default Button;
