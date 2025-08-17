import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Card from "../../components/Card";
import { useApp } from "../../lib/store";
import { todayStr, uid } from "../../lib/utils";
import { colors } from "../../theme";
import { router } from "expo-router";

const today = todayStr();

export default function NewMeal() {
  const { addMeal } = useApp();
  const name = useRef(""); const kcal = useRef(""); const p = useRef(""); const f = useRef(""); const c = useRef("");

  const save = () => {
    addMeal({
      id: uid(),
      date: today,
      type: "lunch",
      items: [{
        id: uid(),
        name: name.current || "Unknown",
        calories: Number(kcal.current || 0),
        protein: Number(p.current || 0),
        fat: Number(f.current || 0),
        carbs: Number(c.current || 0),
      }],
    });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>เพิ่มมื้ออาหาร</Text>
      <Card style={{ marginTop: 16 }}>
        <Text style={styles.label}>ชื่อเมนู</Text>
        <TextInput placeholder="เช่น ข้าวอกไก่" onChangeText={(t) => (name.current = t)} style={styles.input} placeholderTextColor={colors.subtext}/>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          <TextInput placeholder="kcal" keyboardType="numeric" onChangeText={(t)=>kcal.current=t} style={[styles.input, styles.flex]} placeholderTextColor={colors.subtext}/>
          <TextInput placeholder="P" keyboardType="numeric" onChangeText={(t)=>p.current=t} style={[styles.input, styles.flex]} placeholderTextColor={colors.subtext}/>
          <TextInput placeholder="F" keyboardType="numeric" onChangeText={(t)=>f.current=t} style={[styles.input, styles.flex]} placeholderTextColor={colors.subtext}/>
          <TextInput placeholder="C" keyboardType="numeric" onChangeText={(t)=>c.current=t} style={[styles.input, styles.flex]} placeholderTextColor={colors.subtext}/>
        </View>
        <Pressable style={styles.primaryBtn} onPress={save}><Text style={styles.primaryTxt}>บันทึก</Text></Pressable>
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
});
