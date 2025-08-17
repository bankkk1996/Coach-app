import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import Card from "../../components/Card";
import { useApp } from "../../lib/store";
import { todayStr, uid } from "../../lib/utils";
import { colors } from "../../theme";
import { Link } from "expo-router";

const today = todayStr();

export default function Meals() {
  const { meals, addMeal } = useApp();
  const data = meals.filter((m) => m.date === today);

  const addQuick = () =>
    addMeal({
      id: uid(),
      date: today,
      type: "lunch",
      items: [{ id: uid(), name: "ข้าวอกไก่", calories: 520, protein: 40, fat: 12, carbs: 60 }],
    });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meals</Text>

      <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
        <Pressable style={styles.subtleBtn} onPress={addQuick}>
          <Text style={styles.subtleTxt}>+ เพิ่มด่วน</Text>
        </Pressable>
        <Link href="/meal/new" asChild>
          <Pressable style={styles.primaryBtn}><Text style={styles.primaryTxt}>+ เพิ่มแบบละเอียด</Text></Pressable>
        </Link>
      </View>

      <FlatList
        style={{ marginTop: 16 }}
        data={data}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={<Text style={{ color: colors.subtext, marginTop: 16 }}>ยังไม่มีมื้อวันนี้</Text>}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/meal/[id]", params: { id: item.id } }} asChild>
            <Pressable>
              <Card style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "600", color: colors.text }}>
                  {item.type.toUpperCase()} — {item.date}
                </Text>
                {item.items.map((f) => (
                  <Text key={f.id} style={{ color: colors.subtext, marginTop: 4 }}>
                    • {f.name} — {f.calories} kcal / P{f.protein} F{f.fat} C{f.carbs}
                  </Text>
                ))}
              </Card>
            </Pressable>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f9", paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "700", color: colors.text, marginTop: 8 },
  subtleBtn: { backgroundColor: "#f3f4f6", borderWidth: 1, borderColor: colors.border, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12 },
  subtleTxt: { color: colors.text, fontWeight: "500" },
  primaryBtn: { backgroundColor: colors.primary, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12 },
  primaryTxt: { color: "#fff", fontWeight: "600" },
});
