import { Entypo } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyledComponent } from "nativewind";
import { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { classNames } from "@/utils/style";
import { router } from "expo-router";
import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { ShipeexLogoWhite } from "@/components/Shippex-logo";

export default function Landing() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <SafeAreaView className="flex-1">
      <FocusAwareStatusBar backgroundColor="#2F50C1" />
      <View className="bg-app-blue flex-1 p-5">
        <View className="flex-1 border- items-center justify-center">
          <ShipeexLogoWhite />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => bottomSheetRef.current?.expand()}
            className="bg-white py-3 rounded-md "
          >
            <Text className="text-center font-SFProTextBold text-app-blue">
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <BottomSheet
          onClose={() => Keyboard.dismiss()}
          ref={bottomSheetRef}
          snapPoints={["95%"]}
          enablePanDownToClose
          index={-1}
        >
          <StyledComponent component={BottomSheetView} className="px-3 flex-1">
            <View className="space-y-4 border- flex-1">
              <View className="flex flex-row items-center">
                <StyledComponent
                  component={Entypo}
                  name="chevron-left"
                  className="font-bold text-app-blue"
                  size={28}
                />
                <Pressable onPress={() => bottomSheetRef.current?.close()}>
                  <Text className="font-SFProTextRegular text-app-blue">
                    Cancel
                  </Text>
                </Pressable>
              </View>

              <View>
                <Text className="text-2xl font-SFProTextSemibold">Login</Text>
              </View>

              <View>
                <Text className="text-base font-SFProTextRegular text-app-gray">
                  Please enter your first, Last name and phone number in order
                  to register
                </Text>
              </View>

              <View className="flex-1">
                <View className="space-y-8 mt-6 flex-1">
                  <View>
                    <TextInput
                      label="Email"
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      className="bg-app-light-gray text-app-blue text-base font-SFProTextRegular rounded-lg"
                      contentStyle={classNames.style("text-app-blue")}
                      underlineStyle={classNames.style("hidden")}
                      mode="flat"
                    />
                  </View>
                  <View>
                    <TextInput
                      label="Password"
                      secureTextEntry
                      className="bg-app-light-gray text-app-blue text-base font-SFProTextBold rounded-lg"
                      contentStyle={classNames.style(
                        "text-app-blue font-SFProTextBold",
                      )}
                      underlineStyle={classNames.style("hidden")}
                      mode="flat"
                    />
                  </View>
                </View>
                <View className="mt-auto mb-6">
                  <Button
                    className="bg-app-light-gray text-base  rounded-lg"
                    labelStyle={classNames.style("py-2")}
                    onPress={() => {
                      router.push("/(tabs)");
                    }}
                  >
                    <Text className="font-SFProTextBold text-app-gray-200 text-base">
                      Login
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </StyledComponent>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
}
