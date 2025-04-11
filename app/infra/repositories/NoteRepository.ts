import { supabase } from "@infra/databases/supabase";
import { Note } from "app/domain/models/Note";

export function useNoteRepository() {
  async function getOneById(id: string) {
    return supabase
      .from(Note.name)
      .select("*")
      .eq("id", id)
      .single();
  }

  async function getManyByMuralId(id: string) {
    const fields = "*";

    return supabase
     .from(Note.name)
     .select<typeof fields, Note>(fields)
     .eq("mural_id", id)
     .order("created_at", { ascending: false });
  }

  async function upsert(dataToSave: Partial<Note>) {
    return supabase
      .from(Note.name)
      .upsert(dataToSave)
      .select("*")
      .single();
  }

  return {
    getOneById,
    getManyByMuralId,
    upsert,
  }
}