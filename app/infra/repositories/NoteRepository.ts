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

  async function getManyByMuralId(id: string, search?: string) {
    const fields = "*";

    const query = supabase
     .from(Note.name)
     .select<typeof fields, Note>(fields)
     .eq("mural_id", id)
     .is("disabled_at", null)
     .order("created_at", { ascending: false })

    if(search && search.length > 0) {
      query.ilike("title", `%${search}%`);
    }

    return query;
  }

  async function upsert(dataToSave: Partial<Note>) {
    return supabase
      .from(Note.name)
      .upsert(dataToSave)
      .select("*")
      .single();
  }

  async function disable(id: Note["id"]) {
    const date = new Date();

    return supabase
      .from(Note.name)
      .update({ disabled_at: date.toISOString() })
      .eq("id", id);
  }

  return {
    getOneById,
    getManyByMuralId,
    upsert,
    disable,
  }
}