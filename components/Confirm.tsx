import React from "react";
import { Alert } from "react-native";

export function confirm(title: string, message: string, onOk: () => void) {
  Alert.alert(title, message, [
    { text: "ยกเลิก", style: "cancel" },
    { text: "ลบ", style: "destructive", onPress: onOk },
  ]);
}
