import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { StyledComponent } from "nativewind";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import { ListResponse } from "@/sdk/generated";
import { classNames } from "@/utils/style";
import { ShipmentBoxIcon } from "./ShipmentBoxIcon";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function ShipmentListItem(props: {
  data: Exclude<ListResponse["message"], undefined>[number];
  selectAll?: boolean;
}) {
  const [checked, setChecked] = React.useState(false);
  const [expand, setExpand] = React.useState(false);

  React.useEffect(() => {
    setChecked(Boolean(props.selectAll));
  }, [props.selectAll]);

  return (
    <View className="bg-app-light-gray my-2 rounded-lg">
      <View className="flex-row items-center p-2 justify-evenly">
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
          <View className="justify-evenly">
            <Text className="font-SFProTextRegular text-sm text-ritual-cyan-dark">
              {props.data.sender}
            </Text>
            <Text className="font-SFProTextSemibold text-lg">
              {props.data.name}
            </Text>
            <View className="flex-row items-center">
              <Text className="font-SFProTextRegular text-sm capitalize text-app-gray">
                {props.data.origin_city}{" "}
              </Text>
              <StyledComponent
                component={MaterialCommunityIcons}
                name="arrow-right"
                className="text-app-blue"
              />
              <Text className="font-SFProTextRegular capitalize  text-sm text-app-gray">
                {" "}
                {props.data.destination_city}
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
      <Details expand={expand} data={props.data} />
    </View>
  );
}

function Details(props: {
  expand: boolean;
  data: Exclude<ListResponse["message"], undefined>[number];
}) {
  if (!props.expand) {
    return null;
  }

  const originAddress = (props.data.origin_address_line_1 ||
    props.data.origin_address_line2 ||
    "N/A") as string;

  const destinationAddress = (props.data.destination_address_line_1 ||
    props.data.destination_address_line_2 ||
    "N/A") as string;
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
            <Text className="text-base font-SFProTextRegular">
              {props.data.origin_city}
            </Text>
          </View>
          <View>
            <Text className="text-xs font-SFProTextLight text-ritual-cyan-600">
              {originAddress}
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
            <Text className="text-base font-SFProTextRegular">
              {props.data.destination_city}
            </Text>
          </View>
          <View>
            <Text className="text-xs font-SFProTextLight text-ritual-cyan-600">
              {destinationAddress}
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
