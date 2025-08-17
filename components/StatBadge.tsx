import { View, Text } from "react-native";
export function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <View className="px-3 py-2 rounded-xl bg-zinc-100 mr-2 mb-2">
      <Text className="text-zinc-700 text-xs">{label}</Text>
      <Text className="text-zinc-900 font-semibold">{value}</Text>
    </View>
  );
}
