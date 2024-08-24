import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { PaperProvider, useTheme, configureFonts } from "react-native-paper";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

  const queryClient = new QueryClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const theme = useTheme();

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <PaperProvider theme={{ ...theme, fonts }}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </PaperProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const baseFont = {
  fontFamily: "SF-Pro-Text-Regular",
} as const;

const baseVariants = configureFonts({ config: baseFont });

// Then, define custom fonts for different variants

const sfProText = {
  regular: {
    fontFamily: "SF-Pro-Text-Regular",
    fontWeight: "normal",
  },
  italic: {
    fontFamily: "SF-Pro-Text-RegularItalic",
    fontWeight: "normal",
  },
  medium: {
    fontFamily: "SF-Pro-Text-Medium",
    fontWeight: "normal",
  },
  mediumItalic: {
    fontFamily: "SF-Pro-Text-MediumItalic",
    fontWeight: "normal",
  },
  light: {
    fontFamily: "SF-Pro-Text-Light",
    fontWeight: "normal",
  },
  lightItalic: {
    fontFamily: "SF-Pro-Text-LightItalic",
    fontWeight: "normal",
  },
  thin: {
    fontFamily: "SF-Pro-Text-Thin",
    fontWeight: "normal",
  },
  thinItalic: {
    fontFamily: "SF-Pro-Text-ThinItalic",
    fontWeight: "normal",
  },
  ultralight: {
    fontFamily: "SF-Pro-Text-Ultralight",
    fontWeight: "normal",
  },
  ultralightItalic: {
    fontFamily: "SF-Pro-Text-UltralightItalic",
    fontWeight: "normal",
  },
  bold: {
    fontFamily: "SF-Pro-Text-Bold",
    fontWeight: "bold",
  },
  boldItalic: {
    fontFamily: "SF-Pro-Text-BoldItalic",
    fontWeight: "bold",
  },
  heavy: {
    fontFamily: "SF-Pro-Text-Heavy",
    fontWeight: "bold",
  },
  heavyItalic: {
    fontFamily: "SF-Pro-Text-HeavyItalic",
    fontWeight: "bold",
  },
  semibold: {
    fontFamily: "SF-Pro-Text-Semibold",
    fontWeight: "bold",
  },
  semiboldItalic: {
    fontFamily: "SF-Pro-Text-SemiboldItalic",
    fontWeight: "bold",
  },
};

// Finally, merge base variants with your custom tokens
// and apply custom fonts to your theme.

const fonts = configureFonts({
  config: {
    ...baseVariants,
    ...sfProText,
  },
});
