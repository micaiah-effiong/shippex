import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { ShipmentBoxIcon } from "@/components/ShipmentBoxIcon";
import { classNames } from "@/utils/style";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledComponent } from "nativewind";
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Checkbox, TextInput } from "react-native-paper";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function HomeScreen() {
  const [markAll, setMarkAll] = React.useState(false);
  return (
    <View className="bg-white border- border-red-500 flex-1 pt- px-3 space-y-4">
      <FocusAwareStatusBar backgroundColor="#fff" />

      <View className="gap-1">
        <View>
          <Text className="font-SFProTextRegular text-sm text-black/60">
            Hello,
          </Text>
        </View>
        <View>
          <Text className="font-SFProTextBold text-2xl text-black/60">
            Ibrahim Shaker
          </Text>
        </View>
      </View>

      <View className="space-y-3">
        <View>
          <TextInput
            underlineStyle={classNames.style("hidden")}
            className="text-base h-11 rounded-lg justify-center"
            mode="flat"
            placeholder="Search"
            left={
              <TextInput.Icon
                icon={() => (
                  <StyledComponent
                    component={Feather}
                    name="search"
                    size={24}
                    className="text-app-gray-200"
                  />
                )}
              />
            }
            right={
              <TextInput.Icon
                icon={() => (
                  <StyledComponent
                    component={Feather}
                    name="x"
                    size={24}
                    className="text-app-gray-200"
                  />
                )}
              />
            }
          />
        </View>
        <View className="flex-row justify-between gap-3 ">
          <Button
            onPress={() => {}}
            className="dark:bg-app-light-gray bg-app-light-gray rounded-lg flex-1"
          >
            <Text>
              <StyledComponent
                component={MaterialCommunityIcons}
                name="filter-variant"
                size={18}
              />
            </Text>{" "}
            <Text className="font-SFProTextRegular text-ritual-cyan-600">
              Filter
            </Text>
          </Button>
          <Button className="dark:bg-app-light-gray rounded-lg flex-1 bg-app-blue">
            <Text className="font-SFProTextRegular text-white">
              <StyledComponent
                component={MaterialCommunityIcons}
                name="line-scan"
                size={18}
              />
            </Text>{" "}
            <Text className="font-SFProTextRegular text-white ml-3">
              Add Scan
            </Text>
          </Button>
        </View>
      </View>

      <View className="flex-1">
        <View className="flex-1  mt-4 ">
          <View className="flex-row justify-between">
            <View>
              <Text className="font-SFProTextSemibold text-xl">Shipments</Text>
            </View>
            <View className="flex-row items-center">
              <Checkbox
            status={markAll ? "checked" : "unchecked"}
                uncheckedColor={
                  classNames.style("text-app-light-gray-200").color as string
                }
                onPress={()=>setMarkAll(prev=>!prev)}
              />
              <Text className="font-SFProTextRegular text-app-blue">
                Mark all
              </Text>
            </View>
          </View>
          <ScrollView className="space-y-4">
            {Array.from({ length: 10 }).map((_, index) => {
              return <ShipmentListItem key={index} />;
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

function ShipmentListItem() {
  const [checked, setChecked] = React.useState(false);
  const [expand, setExpand] = React.useState(false);

  return (
    <View className="bg-app-light-gray my-2 rounded-lg">
      <View className="flex-row items-center  p-2 justify-between">
        <View>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked((prev) => !prev)}
            uncheckedColor={
              classNames.style("text-app-light-gray-200").color as string
            }
          />
        </View>
        <View className="flex-row items-center gap-2">
          <View>
            <StyledComponent component={ShipmentBoxIcon} className="scale-90" />
          </View>
          <View>
            <Text className="font-SFProTextRegular text-sm text-ritual-cyan-dark">
              AWB
            </Text>
            <Text className="font-SFProTextSemibold text-lg">41785691423</Text>
            <View className="flex-row items-center">
              <Text className="font-SFProTextRegular text-app-gray">
                Cairo{" "}
              </Text>
              <StyledComponent
                component={MaterialCommunityIcons}
                name="arrow-right"
                className="text-app-blue"
              />
              <Text className="font-SFProTextRegular text-app-gray">
                {" "}
                Alexandria
              </Text>
            </View>
          </View>
        </View>
        <View className="border-2 border-white rounded-lg px-1">
          <Text className="uppercase font-SFProTextMedium text-[11px]">
            Received
          </Text>
        </View>
        <TouchableOpacity
          className="bg-white rounded-full p-1.5"
          style={classNames.style("rounded-full p-1.5", {
            "text-white bg-app-blue-200 border-2 border-[#4561DB]/25": expand,
            "text-app-blue bg-white ": !expand,
          })}
          onPress={() => setExpand((prev) => !prev)}
        >
          <StyledComponent
            component={MaterialCommunityIcons}
            style={classNames.style({
              "text-white bg-app-blue-200": expand,
              "text-app-blue": !expand,
            })}
            name="arrow-expand"
          />
        </TouchableOpacity>
      </View>
      <Details expand={expand} />
    </View>
  );
}

function Details(props: { expand: boolean }) {
  if (!props.expand) {
    return null;
  }

  return (
    <View className="p-3 border-t-2 border-t-white border-dashed bg-[#f9f8fb] space-y-4">
      <View className="flex-row items-center justify-between">
        <View>
          <View>
            <Text className="font-SFProTextRegular text-app-blue text-xs">
              Origin
            </Text>
          </View>
          <View>
            <Text className="text-base font-SFProTextRegular">Cairo</Text>
          </View>
          <View>
            <Text className="text-xs font-SFProTextLight text-ritual-cyan-600">
              Dokki, 22 Nile St.
            </Text>
          </View>
        </View>
        <View>
          <StyledComponent
            component={MaterialCommunityIcons}
            name="arrow-right"
            className="text-app-blue"
            size={24}
          />
        </View>
        <View>
          <View>
            <Text className="font-SFProTextRegular text-app-blue text-xs">
              Destination
            </Text>
          </View>
          <View>
            <Text className="text-base font-SFProTextRegular">Alexandria</Text>
          </View>
          <View>
            <Text className="text-xs font-SFProTextLight text-ritual-cyan-600">
              Smoha, 22 max St.
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View className="flex-row justify-end gap-3">
          <Button
            icon={() => (
              <StyledComponent
                component={Ionicons}
                name="call"
                className="text-white"
              />
            )}
            className="bg-app-blue-200 rounded-lg"
          >
            <Text className="text-white">Call</Text>
          </Button>

          <Button
            icon={() => <WhatsAppIcon />}
            className="bg-[#25D366] rounded-lg items-center"
          >
            <Text className="text-white">WhatsApp</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
