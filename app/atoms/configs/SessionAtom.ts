import { atom } from "jotai";
import { User } from "@supabase/supabase-js";

type Values = {
  user: User | null;
}

export const SessionAtom = atom<Values>({
  user: null,
});