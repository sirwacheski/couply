import "react-native-url-polyfill/auto";
import { MMKV } from "react-native-mmkv";
import { createClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const secret = process.env.EXPO_PUBLIC_SUPABASE_SECRET!;

const storage = new MMKV({
  id: "@supabase/auth",
});

export const supabase = createClient(url, secret, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: {
      removeItem: (key) => storage.delete(key),
      getItem: (key) => storage.getString(key)!,
      setItem: (key, value) => storage.set(key, value),
    },
  },
});