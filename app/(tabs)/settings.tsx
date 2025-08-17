import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Card from "../../components/Card";
import { useApp } from "../../lib/store";
import { colors } from "../../theme";

export default function Settings() {
  const { goals, setGoals } = useApp();
  const kcal = useRef(goals.dailyCalories?.toString() ?? "");
  const protein = useRef(goals.dailyProtein?.toString() ?? "");
  const weight = useRef(goals.targetWeightKg?.toString() ?? "");

  const save = () => {
    setGoals({
      dailyCalories: Number(kcal.current || 0),
      dailyProtein: Number(protein.current || 0),
      targetWeightKg: Number(weight.current || 0),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Card style={{ marginTop: 16 }}>
        <Text style={styles.label}>เป้าหมายพลังงาน/วัน (kcal)</Text>
        <TextInput defaultValue={kcal.current} keyboardType="numeric" onChangeText={(t)=>kcal.current = t} style={styles.input}/>
        <Text style={[styles.label, { marginTop: 12 }]}>เป้าหมายโปรตีน/วัน (g)</Text>
        <TextInput defaultValue={protein.current} keyboardType="numeric" onChangeText={(t)=>protein.current = t} style={styles.input}/>
        <Text style={[styles.label, { marginTop: 12 }]}>เป้าหมายน้ำหนัก (kg)</Text>
        <TextInput defaultValue={weight.current} keyboardType="numeric" onChangeText={(t)=>weight.current = t} style={styles.input}/>
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
  primaryBtn: { marginTop: 16, backgroundColor: colors.primary, paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  primaryTxt: { color: "#fff", fontWeight: "700" },
});
