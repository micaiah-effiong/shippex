import { Entypo } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyledComponent } from "nativewind";
import { ReactElement, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { classNames } from "@/utils/style";
import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { ShipeexLogoWhite } from "@/components/Shippex-logo";
import { useMutation } from "@tanstack/react-query";
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
  useController,
  useForm,
} from "react-hook-form";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/sdk/generated";
import { apiConfig } from "@/sdk";
import { router } from "expo-router";
import { useSetAtom } from "jotai";
import { userAtom } from "@/atoms";

type FormType = {
  usr: string | undefined;
  pwd: string | undefined;
};

export default function Landing() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const setUser = useSetAtom(userAtom);

  const loginMutation = useMutation({
    mutationKey: ["login-"],
    mutationFn: apiConfig.DefaultService.postApiMethodLogin,
    // mutationFn: (data) =>
    //   axios.post(
    //     "https://shippex-demo.bc.brandimic.com/api/method/login",
    //     data,
    //   ),
    onError(error) {
      const e = error as ApiError;
      console.log("error-", e);
    },
    onSuccess: (data, v, context) => {
      if (data.full_name) {
        setUser({ full_name: data.full_name });
      }

      console.log("data", data);
      console.log("context", context);
      console.log("variable", v);
      router.replace("/(tabs)/");
    },
  });

  const form = useForm<FormType>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: FormType) => {
    Keyboard.dismiss();
    loginMutation.mutate(data);
  };

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
                <View className="space-y-3 mt-6 flex-1">
                  <View>
                    <AuthInput
                      name="usr"
                      control={form.control}
                      renderItem={(field) => {
                        return (
                          <>
                            <TextInput
                              label="Email"
                              onChangeText={field.onChange}
                              value={field.value}
                              keyboardType="email-address"
                              textContentType="emailAddress"
                              className="bg-app-light-gray text-app-blue text-base font-SFProTextRegular rounded-lg"
                              contentStyle={classNames.style("text-app-blue")}
                              underlineStyle={classNames.style("hidden")}
                              mode="flat"
                              error={Boolean(form.formState.errors.usr)}
                            />
                            <HelperText
                              type="error"
                              visible={Boolean(form.formState.errors.usr)}
                            >
                              {form.formState.errors.usr?.message}
                            </HelperText>
                          </>
                        );
                      }}
                    />
                  </View>
                  <View>
                    <AuthInput
                      name="pwd"
                      control={form.control}
                      renderItem={(field) => {
                        return (
                          <>
                            <TextInput
                              label="Password"
                              value={field.value}
                              onChangeText={field.onChange}
                              secureTextEntry
                              className="bg-app-light-gray text-app-blue text-base font-SFProTextBold rounded-lg"
                              contentStyle={classNames.style(
                                "text-app-blue font-SFProTextBold",
                              )}
                              underlineStyle={classNames.style("hidden")}
                              mode="flat"
                              error={Boolean(form.formState.errors.pwd)}
                            />
                            <HelperText
                              type="error"
                              visible={Boolean(form.formState.errors.pwd)}
                            >
                              {form.formState.errors.pwd?.message}
                            </HelperText>
                          </>
                        );
                      }}
                    />
                    <HelperText
                      type="error"
                      visible={Boolean(loginMutation.error)}
                    >
                      {(loginMutation.error as ApiError)?.body?.message ||
                        loginMutation.error?.message}
                    </HelperText>
                  </View>
                </View>
                <View className="mt-auto mb-6">
                  <Button
                    loading={loginMutation.isPending}
                    disabled={!form.formState.isValid}
                    style={classNames.style("text-base rounded-lg", {
                      "bg-app-light-gray": !form.formState.isValid,
                      "bg-app-blue": form.formState.isValid,
                    })}
                    labelStyle={classNames.style("py-2 text-white")}
                    onPress={form.handleSubmit(onSubmit)}
                  >
                    <Text
                      style={classNames.style("font-SFProTextBold text-base", {
                        "text-app-gray-200": !form.formState.isValid,
                        "text-white": form.formState.isValid,
                      })}
                    >
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

function AuthInput<T extends FieldValues>(props: {
  name: Path<T>;
  control: Control<T>;
  renderItem: (props: ControllerRenderProps<T, Path<T>>) => ReactElement;
}) {
  const { field } = useController({
    control: props.control,
    name: props.name,
    // defaultValue: "",
  });

  return props.renderItem(field);
}

const PASSWORD_LENGTH = 8;
const loginSchema = z.object({
  usr: z.string().email(),
  pwd: z
    .string()
    .min(
      PASSWORD_LENGTH,
      `Password must contain at least ${PASSWORD_LENGTH} characters`,
    ),
});
