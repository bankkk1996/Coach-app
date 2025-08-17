import React, { useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Card from "../../components/Card";
import { useLocalSearchParams, router } from "expo-router";
import { useApp } from "../../lib/store";
import { colors } from "../../theme";
import { confirm } from "../../components/Confirm";

export default function WorkoutDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { workouts, updateWorkout, deleteWorkout } = useApp();
  const w = useMemo(() => workouts.find((x) => x.id === id), [workouts, id]);

  const title = useRef(w?.title ?? "");
  const duration = useRef(String(w?.durationMin ?? ""));
  const intensity = useRef(w?.intensity ?? "moderate");

  if (!w) return <SafeAreaView style={styles.container}><Text style={styles.title}>ไม่พบข้อมูล</Text></SafeAreaView>;

  const save = () => {
    updateWorkout(w.id, { title: title.current || "Workout", durationMin: Number(duration.current || 0), intensity: (intensity.current as any) || "moderate" });
    router.back();
  };
  const remove = () => confirm("ลบเวิร์กเอาต์?", "ยืนยันการลบรายการนี้", () => { deleteWorkout(w.id); router.replace("/(tabs)/workout"); });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>แก้ไขออกกำลัง</Text>
      <Card style={{ marginTop: 16 }}>
        <TextInput defaultValue={title.current} onChangeText={(t)=>title.current=t} style={styles.input}/>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          <TextInput defaultValue={duration.current} keyboardType="numeric" onChangeText={(t)=>duration.current=t} style={[styles.input, { flex: 1 }]} />
          <TextInput defaultValue={String(intensity.current)} onChangeText={(t)=>intensity.current=t as any} style={[styles.input, { flex: 1 }]} />
        </View>
        <Pressable style={styles.primaryBtn} onPress={save}><Text style={styles.primaryTxt}>บันทึก</Text></Pressable>
        <Pressable style={styles.dangerBtn} onPress={remove}><Text style={styles.dangerTxt}>ลบ</Text></Pressable>
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
  dangerBtn: { marginTop: 10, paddingVertical: 12, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: "#ef4444" },
  dangerTxt: { color: "#ef4444", fontWeight: "700" },
});
