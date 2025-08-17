import React, { useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Card from "../../components/Card";
import { useLocalSearchParams, router } from "expo-router";
import { useApp } from "../../lib/store";
import { colors } from "../../theme";
import { confirm } from "../../components/Confirm";

export default function MealDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { meals, updateMeal, deleteMeal } = useApp();
  const meal = useMemo(() => meals.find((m) => m.id === id), [meals, id]);

  const name = useRef(meal?.items[0]?.name ?? "");
  const kcal = useRef(String(meal?.items[0]?.calories ?? ""));
  const p = useRef(String(meal?.items[0]?.protein ?? ""));
  const f = useRef(String(meal?.items[0]?.fat ?? ""));
  const c = useRef(String(meal?.items[0]?.carbs ?? ""));

  if (!meal) {
    return <SafeAreaView style={styles.container}><Text style={styles.title}>ไม่พบข้อมูล</Text></SafeAreaView>;
  }

  const save = () => {
    const item = { ...meal.items[0],
      name: name.current || "Unknown",
      calories: Number(kcal.current || 0),
      protein: Number(p.current || 0),
      fat: Number(f.current || 0),
      carbs: Number(c.current || 0),
    };
    updateMeal(meal.id, { items: [item] });
    router.back();
  };

  const remove = () => confirm("ลบมื้ออาหาร?", "ยืนยันการลบรายการนี้", () => { deleteMeal(meal.id); router.replace("/(tabs)/meals"); });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>แก้ไขมื้ออาหาร</Text>
      <Card style={{ marginTop: 16 }}>
        <Text style={styles.label}>ชื่อเมนู</Text>
        <TextInput defaultValue={name.current} onChangeText={(t)=>name.current=t} style={styles.input}/>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          <TextInput defaultValue={kcal.current} keyboardType="numeric" onChangeText={(t)=>kcal.current=t} style={[styles.input, styles.flex]} />
          <TextInput defaultValue={p.current} keyboardType="numeric" onChangeText={(t)=>p.current=t} style={[styles.input, styles.flex]} />
          <TextInput defaultValue={f.current} keyboardType="numeric" onChangeText={(t)=>f.current=t} style={[styles.input, styles.flex]} />
          <TextInput defaultValue={c.current} keyboardType="numeric" onChangeText={(t)=>c.current=t} style={[styles.input, styles.flex]} />
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
  label: { color: colors.text, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, color: colors.text, backgroundColor: "#fff", marginTop: 8 },
  flex: { flex: 1 },
  primaryBtn: { marginTop: 16, backgroundColor: colors.primary, paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  primaryTxt: { color: "#fff", fontWeight: "700" },
  dangerBtn: { marginTop: 10, paddingVertical: 12, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: "#ef4444" },
  dangerTxt: { color: "#ef4444", fontWeight: "700" },
});
