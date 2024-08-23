import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Scan() {
  return (
    <View className="flex-1">
      <FocusAwareStatusBar backgroundColor="#fff" />
      <View className="bg-white flex-1"></View>
    </View>
  );
}
