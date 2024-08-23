import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BarCode, Shipment, User, Wallet } from "@/components/TabIcons";
import { StyledComponent } from "nativewind";
import { classNames } from "@/utils/style";
import { View, Text } from "react-native";
import { SvgProps } from "react-native-svg";
import { Image } from "expo-image";
import { ShipeexLogoSmallBlue } from "@/components/Shippex-logo";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // headerShown: false,
        tabBarStyle: classNames.style("py-3 h-16 bg-white"),
        headerStyle: classNames.style("bg-white"),
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitle(_props) {
          return <ShipeexLogoSmallBlue />;
        },

        headerLeft(_props) {
          return (
            <View className="ml-3 w-10 aspect-square rounded-full bg-gray-300">
              <Image
                // style={styles.image}
                className="w-full aspect-square rounded-full"
                source="https://nextui.org/images/album-cover.png"
                // placeholder={{ blurhash }}
                contentFit="contain"
                transition={1000}
              />
            </View>
          );
        },
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarLabel: () => null,
          tabBarIcon: TabIconFn({ title: "Shipment", icon: Shipment }),
          headerRight: () => {
            return (
              <View className="mr-3 rounded-full bg-app-light-gray p-1.5">
                <StyledComponent
                  component={MaterialIcons}
                  name="notifications-none"
                  size={25}
                  className="text-app-blue"
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "",
          tabBarLabel: () => null,
          tabBarIcon: TabIconFn({ title: "Scan", icon: BarCode }),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "",
          tabBarLabel: () => null,
          tabBarIcon: TabIconFn({ title: "Wallet", icon: Wallet }),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarLabel: () => null,
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
    const styles: Array<Record<string, boolean> | string> = [
      { "text-app-blue": props.focused },
      { "text-app-gray-200": !props.focused },
      "font-SFProTextRegular text-[11px]",
    ];
    return (
      <View className="flex justify-center items-center gap-1">
        <StyledComponent
          component={opt.icon}
          fill={classNames.style(...styles).color as string}
        />
        <Text style={classNames.style(...styles)}>{opt.title}</Text>
      </View>
    );
  };
}
