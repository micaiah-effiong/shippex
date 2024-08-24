import { FocusAwareStatusBar } from "@/components/FocusAwareStatusBar";
import { classNames } from "@/utils/style";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyledComponent } from "nativewind";
import React from "react";
import { View, Text, RefreshControl, Keyboard } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Button, Checkbox, TextInput } from "react-native-paper";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
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
import { Chip } from "@/components/Chip";
import { ShipmentListItem } from "@/components/ShipmentListItem";

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

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        enableTouchThrough={false}
        appearsOnIndex={1}
        pressBehavior="none"
      />
    ),
    [],
  );

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
          "destination_city",
          "origin_city",
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
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      searchRef.current?.clear();
                    }}
                  >
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
            onPress={() => bottomSheetRef.current?.expand()}
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
                refreshing={getListQuery.isPending}
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
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["45%"]}
        index={-1}
        backdropComponent={renderBackdrop}
      >
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
