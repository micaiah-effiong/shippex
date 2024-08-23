import { Tabs } from "expo-router";
import React from "react";

import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BarCode, Shipment, User, Wallet } from "@/components/TabIcons";
import { StyledComponent } from "nativewind";
import { classNames } from "@/utils/style";
import { View, Text } from "react-native";
import { SvgProps } from "react-native-svg";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: classNames.style("py-3 h-16"),
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shipment",
          tabBarLabelStyle: classNames.style("hidden"),
          tabBarIcon: TabIconFn({ title: "Shipment", icon: Shipment }),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarLabelStyle: classNames.style("hidden"),
          tabBarIcon: TabIconFn({ title: "Scan", icon: BarCode }),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarLabelStyle: classNames.style("hidden"),
          tabBarIcon: TabIconFn({ title: "Wallet", icon: Wallet }),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabelStyle: classNames.style("hidden"),
          tabBarIcon: TabIconFn({ title: "Profile", icon: User }),
        }}
      />
    </Tabs>
  );
}

function TabIconFn(opt: {
  title: string;
  icon: (props: SvgProps) => React.JSX.Element;
}) {
  return (props: {
    focused: boolean;
    color: string;
    size: number;
  }): React.ReactNode => {
    const styles: Array<Record<string, boolean>> = [
      { "text-app-blue": props.focused },
      { "text-app-gray-200": !props.focused },
    ];
    return (
      <View className="flex justify-center items-center gap-1">
        <StyledComponent
          component={opt.icon}
          fill={classNames.style(...styles).color as string}
        />
        <Text
          style={classNames.style("font-SFProTextRegular text-xs", ...styles)}
        >
          {opt.title}
        </Text>
      </View>
    );
  };
}
