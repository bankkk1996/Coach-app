import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import Card from "../../components/Card";
import { useApp } from "../../lib/store";
import { todayStr, uid } from "../../lib/utils";
import { colors } from "../../theme";
import { Link } from "expo-router";

const today = todayStr();

export default function Workout() {
  const { workouts, addWorkout, toggleWorkout } = useApp();
  const data = workouts.filter((w) => w.date === today);

  const addQuick = () =>
    addWorkout({
      id: uid(),
      date: today,
      title: "Full Body A",
      durationMin: 40,
      intensity: "moderate",
      completed: false,
    });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Workout</Text>

      <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
        <Pressable style={styles.subtleBtn} onPress={addQuick}>
          <Text style={styles.subtleTxt}>+ เพิ่มด่วน</Text>
        </Pressable>
        <Link href="/workout/new" asChild>
          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryTxt}>+ เพิ่มแบบละเอียด</Text>
          </Pressable>
        </Link>
      </View>

      <FlatList
        style={{ marginTop: 16 }}
        data={data}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={
          <Text style={{ color: colors.subtext, marginTop: 16 }}>
            ยังไม่มีเวิร์กเอาต์วันนี้
          </Text>
        }
        renderItem={({ item }) => (
          <Card
            style={{
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{ flex: 1 }}
              onPress={() => toggleWorkout(item.id)}
            >
              <Text style={{ fontWeight: "600", color: colors.text }}>
                {item.title}
              </Text>
              <Text style={{ color: colors.subtext, marginTop: 4 }}>
                {item.durationMin} นาที • {item.intensity}
              </Text>
            </Pressable>
            <View style={{ flexDirection: "row", gap: 6 }}>
              <Pressable
                style={[
                  styles.pill,
                  item.completed && { backgroundColor: colors.primary },
                ]}
                onPress={() => toggleWorkout(item.id)}
              >
                <Text
                  style={[styles.pillTxt, item.completed && { color: "#fff" }]}
                >
                  {item.completed ? "สำเร็จแล้ว" : "ทำเสร็จ"}
                </Text>
              </Pressable>
              <Link
                href={{ pathname: "/workout/[id]", params: { id: item.id } }}
                asChild
              >
                <Pressable style={styles.pill}>
                  <Text style={styles.pillTxt}>แก้ไข</Text>
                </Pressable>
              </Link>
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f9", paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "700", color: colors.text, marginTop: 8 },
  subtleBtn: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  subtleTxt: { color: colors.text, fontWeight: "500" },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  primaryTxt: { color: "#fff", fontWeight: "600" },
  pill: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  pillTxt: { color: colors.text },
});
