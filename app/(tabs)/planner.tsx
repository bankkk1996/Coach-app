// app/(tabs)/planner.tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import Card from "../../components/Card";
import { colors } from "../../theme";

export default function Planner() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Planner</Text>

      <View style={styles.headerRow}>
        <Text style={styles.headerDate}>April 25</Text>
        <Text style={styles.today}>Today</Text>
      </View>

      <Card style={{ marginTop: 16 }}>
        <Text style={styles.itemTitle}>Meal</Text>
        <Text style={styles.itemSub}>No meal planned</Text>
      </Card>

      <Card style={{ marginTop: 8 }}>
        <Text style={styles.itemTitle}>Workout</Text>
        <Text style={styles.itemSub}>No workout planned</Text>
      </Card>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "700", color: colors.text, marginTop: 8 },
  headerRow: { marginTop: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerDate: { color: colors.text },
  today: { color: colors.primary, fontWeight: "600" },
  itemTitle: { fontWeight: "600", color: colors.text },
  itemSub: { color: colors.subtext, marginTop: 4 },
});
