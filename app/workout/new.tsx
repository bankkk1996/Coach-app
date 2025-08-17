import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Card from "../../components/Card";
import { useApp } from "../../lib/store";
import { todayStr, uid } from "../../lib/utils";
import { colors } from "../../theme";
import { router } from "expo-router";

const today = todayStr();

export default function NewWorkout() {
  const { addWorkout } = useApp();
  const title = useRef(""); const duration = useRef(""); const intensity = useRef("moderate");

  const save = () => {
    addWorkout({ id: uid(), date: today, title: title.current || "Workout", durationMin: Number(duration.current || 0), intensity: (intensity.current as any) || "moderate", completed: false });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>เพิ่มออกกำลัง</Text>
      <Card style={{ marginTop: 16 }}>
        <TextInput placeholder="ชื่อโปรแกรม (เช่น Full Body A)" onChangeText={(t)=>title.current=t} style={styles.input} placeholderTextColor={colors.subtext}/>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          <TextInput placeholder="นาที" keyboardType="numeric" onChangeText={(t)=>duration.current=t} style={[styles.input, { flex: 1 }]} placeholderTextColor={colors.subtext}/>
          <TextInput placeholder="ความหนัก (easy/moderate/hard)" onChangeText={(t)=>intensity.current=t} style={[styles.input, { flex: 1 }]} placeholderTextColor={colors.subtext}/>
        </View>
        <Pressable style={styles.primaryBtn} onPress={save}><Text style={styles.primaryTxt}>บันทึก</Text></Pressable>
      </Card>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f9", paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "700", color: colors.text, marginTop: 8 },
  input: { borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, color: colors.text, backgroundColor: "#fff" },
  primaryBtn: { marginTop: 16, backgroundColor: colors.primary, paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  primaryTxt: { color: "#fff", fontWeight: "700" },
});
