import * as React from "react";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { StatusBarProps } from "expo-status-bar";

export function FocusAwareStatusBar(props: StatusBarProps) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}
