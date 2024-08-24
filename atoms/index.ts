import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = createJSONStorage<{ full_name: string } | null>(
  () => AsyncStorage,
);

export const userAtom = atomWithStorage("user", null, storage);
