import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),

    "SF-Pro-Text-Black": require("../assets/fonts/SFProText/SF-Pro-Text-Black.otf"),
    "SF-Pro-Text-BlackItalic": require("../assets/fonts/SFProText/SF-Pro-Text-BlackItalic.otf"),
    "SF-Pro-Text-Bold": require("../assets/fonts/SFProText/SF-Pro-Text-Bold.otf"),
    "SF-Pro-Text-BoldItalic": require("../assets/fonts/SFProText/SF-Pro-Text-BoldItalic.otf"),
    "SF-Pro-Text-Heavy": require("../assets/fonts/SFProText/SF-Pro-Text-Heavy.otf"),
    "SF-Pro-Text-HeavyItalic": require("../assets/fonts/SFProText/SF-Pro-Text-HeavyItalic.otf"),
    "SF-Pro-Text-Light": require("../assets/fonts/SFProText/SF-Pro-Text-Light.otf"),
    "SF-Pro-Text-LightItalic": require("../assets/fonts/SFProText/SF-Pro-Text-LightItalic.otf"),
    "SF-Pro-Text-Medium": require("../assets/fonts/SFProText/SF-Pro-Text-Medium.otf"),
    "SF-Pro-Text-MediumItalic": require("../assets/fonts/SFProText/SF-Pro-Text-MediumItalic.otf"),
    "SF-Pro-Text-Regular": require("../assets/fonts/SFProText/SF-Pro-Text-Regular.otf"),
    "SF-Pro-Text-RegularItalic": require("../assets/fonts/SFProText/SF-Pro-Text-RegularItalic.otf"),
    "SF-Pro-Text-Semibold": require("../assets/fonts/SFProText/SF-Pro-Text-Semibold.otf"),
    "SF-Pro-Text-SemiboldItalic": require("../assets/fonts/SFProText/SF-Pro-Text-SemiboldItalic.otf"),
    "SF-Pro-Text-Thin": require("../assets/fonts/SFProText/SF-Pro-Text-Thin.otf"),
    "SF-Pro-Text-ThinItalic": require("../assets/fonts/SFProText/SF-Pro-Text-ThinItalic.otf"),
    "SF-Pro-Text-Ultralight": require("../assets/fonts/SFProText/SF-Pro-Text-Ultralight.otf"),
    "SF-Pro-Text-UltralightItalic": require("../assets/fonts/SFProText/SF-Pro-Text-UltralightItalic.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
