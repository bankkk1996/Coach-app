import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import Card from "../../components/Card";
import { useApp } from "../../lib/store";
import { todayStr, uid } from "../../lib/utils";
import { colors } from "../../theme";
import { Link, router } from "expo-router";
import { confirm } from "@/components/Confirm";

const today = todayStr();

export default function Meals() {
  const { meals, addMeal, deleteMeal } = useApp();
  const data = meals.filter((m) => m.date === today);

  const addQuick = () =>
    addMeal({
      id: uid(),
      date: today,
      type: "lunch",
      items: [
        {
          id: uid(),
          name: "ข้าวอกไก่",
          calories: 520,
          protein: 40,
          fat: 12,
          carbs: 60,
        },
      ],
    });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meals</Text>

      {/* ปุ่มเพิ่ม */}
      <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
        <Pressable style={styles.subtleBtn} onPress={addQuick}>
          <Text style={styles.subtleTxt}>+ เพิ่มด่วน</Text>
        </Pressable>
        <Link href="/meal/new" asChild>
          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryTxt}>+ เพิ่มแบบละเอียด</Text>
          </Pressable>
        </Link>
      </View>

      {/* รายการมื้ออาหาร */}
      <FlatList
        style={{ marginTop: 16 }}
        data={data}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={
          <Text
            style={{
              color: colors.subtext,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            🍽️ ยังไม่มีมื้ออาหารสำหรับวันนี้
          </Text>
        }
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12, padding: 12 }}>
            {/* header: ชื่อมื้อ + ปุ่มลบ */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link
                href={{ pathname: "/meal/[id]", params: { id: item.id } }}
                asChild
              >
                <Pressable style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: colors.text,
                      fontSize: 16,
                    }}
                  >
                    {item.type.toUpperCase()} — {item.date}
                  </Text>
                </Pressable>
              </Link>

              <Pressable
                onPress={() =>
                  confirm("ลบมื้ออาหาร?", "ยืนยันการลบรายการนี้", () => {
                    deleteMeal(item.id);
                    router.replace("/(tabs)/meals");
                  })
                }
                style={{
                  backgroundColor: "#fee2e2",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 8,
                  marginLeft: 8,
                }}
              >
                <Text style={{ color: "#b91c1c", fontWeight: "600" }}>ลบ</Text>
              </Pressable>
            </View>

            {/* food items */}
            {item.items.map((f) => (
              <Text
                key={f.id}
                style={{ color: colors.subtext, marginTop: 6, fontSize: 14 }}
              >
                • {f.name} — {f.calories} kcal | P{f.protein} F{f.fat} C
                {f.carbs}
              </Text>
            ))}
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
  dangerBtn: {
    backgroundColor: "#ef4444", // แดง
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  dangerTxt: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
