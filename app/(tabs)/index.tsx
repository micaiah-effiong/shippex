import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { ShipmentBoxIcon } from "@/components/ShipmentBoxIcon";
import { classNames } from "@/utils/style";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledComponent } from "nativewind";
import React from "react";
import { View, Text, RefreshControl } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Button, Checkbox, TextInput } from "react-native-paper";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { apiConfig } from "@/sdk";
import { Filters, ListResponse } from "@/sdk/generated";
import { userAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { useDebouncedCallback } from "use-debounce";

const defaultList: ListResponse["message"] = [];
const LIST_QUERY_KEY = "get-list";

export default function HomeScreen() {
  const [markAll, setMarkAll] = React.useState(false);
  const qc = useQueryClient();
  const searchRef = React.useRef<React.ElementRef<typeof TextInput>>(null);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const currentUser = useAtomValue(userAtom);
  const [search, setSearch] = React.useState("");
  const searchFilter = React.useMemo(() => {
    if (!search) {
      return null;
    }
    return { name: ["like", `%${search}%`] } as Filters;
  }, [search]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 1000);

  const getListQuery = useQuery({
    queryKey: [LIST_QUERY_KEY, search],
    queryFn: () => {
      return apiConfig.DefaultService.postApiMethodFrappeClientGetList({
        doctype: "AWB",
        fields: [
          "name",
          "sender",
          "destination_address_line_1",
          "destination_address_line_2",
          "origin_adress_line_1",
          "origin_address_line_1",
          "origin_address_line2",
        ],
        filters: searchFilter,
      });
    },
    placeholderData: keepPreviousData,
  });

  const onRefresh = React.useCallback(() => {
    qc.invalidateQueries({ queryKey: [LIST_QUERY_KEY] });
  }, []);

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

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
          <Text className="font-SFProTextBold text-2xl text-black">
            {currentUser?.full_name}
          </Text>
        </View>
      </View>

      <View className="space-y-3">
        <View>
          <TextInput
            ref={searchRef as any}
            underlineStyle={classNames.style("hidden")}
            className="text-base h-11 rounded-lg justify-center bg-app-light-gray"
            mode="flat"
            placeholder="Search"
            onChangeText={debouncedSearch}
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
                  <TouchableOpacity onPress={() => searchRef.current?.clear()}>
                    <StyledComponent
                      component={Feather}
                      name="x"
                      size={24}
                      className="text-app-gray-200"
                    />
                  </TouchableOpacity>
                )}
              />
            }
          />
        </View>
        <View className="flex-row justify-between gap-3 ">
          <Button
            onPress={handleCloseBottomSheet}
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
              Filters
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
                onPress={() => setMarkAll((prev) => !prev)}
              />
              <Text className="font-SFProTextRegular text-app-blue">
                Mark all
              </Text>
            </View>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={getListQuery.isLoading}
                onRefresh={onRefresh}
              />
            }
            data={getListQuery.data?.message || defaultList}
            keyExtractor={(item) => item?.name as string}
            renderItem={({ item }) => {
              return (
                <ShipmentListItem
                  key={item.name}
                  data={item}
                  selectAll={markAll}
                />
              );
            }}
          />
        </View>
      </View>
      <BottomSheet ref={bottomSheetRef} snapPoints={["45%"]} index={-1}>
        <StyledComponent component={BottomSheetView} className=" flex-1">
          <View className="flex-row justify-between border-b border-b-app-light-gray-200 px-3">
            <Button onPress={handleCloseBottomSheet}>
              <Text className="text- font-SFProTextRegular text-app-blue">
                Cancel
              </Text>
            </Button>
            <Button>
              <Text className="font-SFProTextSemibold text-black">Filters</Text>
            </Button>
            <Button onPress={handleCloseBottomSheet}>
              <Text className="text- font-SFProTextRegular text-app-blue">
                Done
              </Text>
            </Button>
          </View>

          <View className="flex-1 p-3">
            <View>
              <Text className="uppercase font-SFProTextRegular">
                shipment status
              </Text>
            </View>
            <View className="justify-start flex-row flex-wrap py-2 flex-1">
              <Chip label="Received" onPress={() => {}} />
              <Chip label="Putaway" onPress={() => {}} />
              <Chip label="Delivered" onPress={() => {}} />
              <Chip label="Canceled" onPress={() => {}} />
              <Chip label="Rejected" onPress={() => {}} />
              <Chip label="Lost" onPress={() => {}} />
              <Chip label="On Hold" onPress={() => {}} />
            </View>
          </View>
        </StyledComponent>
      </BottomSheet>
    </View>
  );
}

function ShipmentListItem(props: {
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
              {props.data.sender}
            </Text>
            <Text
              className="font-SFProTextSemibold text-lg truncate"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {props.data.name}
            </Text>
            <View className="flex-row items-center">
              <Text className="font-SFProTextRegular text-app-gray">
                {props.data.origin_city}{" "}
              </Text>
              <StyledComponent
                component={MaterialCommunityIcons}
                name="arrow-right"
                className="text-app-blue"
              />
              <Text className="font-SFProTextRegular text-app-gray">
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

  const originAddress = (props.data.origin_adress_line_1 ||
    props.data.origin_address_line_1 ||
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

function Chip(props: { label: string; onPress: (checked: boolean) => void }) {
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
