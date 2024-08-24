import { classNames } from "@/utils/style";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export function Chip(props: {
  label: string;
  onPress: (checked: boolean) => void;
}) {
  const [checked, setChecked] = React.useState(false);

  const handleChecked = () => {
    props.onPress(!checked);
    setChecked((prev) => !prev);
  };

  return (
    <View
      style={classNames.style("mr-3 mb-3", {
        "border border-app-gray rounded-lg": checked,
      })}
    >
      <Button className="bg-app-light-gray rounded-lg" onPress={handleChecked}>
        <Text className="text-ritual-cyan-600">{props.label}</Text>
      </Button>
    </View>
  );
}
