import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Card from "../../components/Card";
import { useApp } from "../../lib/store";
import { todayStr } from "../../lib/utils";
import { colors } from "../../theme";
import { Link } from "expo-router";

const today = todayStr();

export default function Home() {
  const { meals, workouts, goals } = useApp();

  const totals = useMemo(() => {
    const m = meals.filter((x) => x.date === today);
    const kcal = m.reduce((s, e) => s + e.items.reduce((ss, i) => ss + i.calories, 0), 0);
    const protein = m.reduce((s, e) => s + e.items.reduce((ss, i) => ss + i.protein, 0), 0);
    const done = workouts.filter((w) => w.date === today && w.completed).length;
    return { kcal, protein, done };
  }, [meals, workouts]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Card style={{ marginTop: 16 }}>
        <Text style={{ color: colors.subtext }}>Today's Summary</Text>
        <Text style={styles.big}>{totals.kcal} kcal</Text>
        <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
          <Text style={{ color: colors.text, fontWeight: "600" }}>Protein: {totals.protein} g</Text>
          <Text style={{ color: colors.text, fontWeight: "600" }}>Workout done: {totals.done}</Text>
        </View>
        {goals.dailyCalories ? (
          <Text style={{ color: colors.subtext, marginTop: 6 }}>
            Goal {goals.dailyCalories} kcal • {Math.min(100, Math.round((totals.kcal / (goals.dailyCalories || 1)) * 100))}% reached
          </Text>
        ) : <Text style={{ color: colors.subtext, marginTop: 6 }}>ตั้งค่าเป้าหมายใน Settings</Text>}
      </Card>

      <View style={{ marginTop: 16 }}>
        <Link href="/meal/new" asChild>
          <Pressable style={[styles.row, styles.rowTop]}><Text style={styles.link}>+ Add Meal</Text></Pressable>
        </Link>
        <Link href="/workout/new" asChild>
          <Pressable style={[styles.row, styles.rowBottom]}><Text style={styles.link}>+ Add Workout</Text></Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f9", paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "700", color: colors.text, marginTop: 8 },
  big: { marginTop: 8, fontSize: 28, fontWeight: "800", color: colors.text },
  row: { paddingVertical: 16, paddingHorizontal: 16, backgroundColor: "#fff", borderColor: "#e5e7eb", borderLeftWidth: 1, borderRightWidth: 1 },
  rowTop: { borderTopLeftRadius: 16, borderTopRightRadius: 16, borderTopWidth: 1, borderBottomWidth: 1 },
  rowBottom: { borderBottomLeftRadius: 16, borderBottomRightRadius: 16, borderBottomWidth: 1 },
  link: { color: colors.primary, fontWeight: "600" },
});
