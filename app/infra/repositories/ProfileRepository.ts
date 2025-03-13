import { Profile } from "app/domain/models/Profile";
import { supabase } from "@infra/databases/supabase";
import { Attachment } from "app/domain/models/Attachment";

export function useProfileRepository() {
  async function getOneByIdOrUser(identifier: string, byUser: boolean) {
    const fields = "*, avatar:avatar_id(*)";

    return supabase
      .from("profiles")
      .select<typeof fields, Profile>(fields)
      .eq(byUser ? "user_id" : "id", identifier)
      .single();
  }

  async function getOneById(id: string) {
    return getOneByIdOrUser(id, false);
  }

  async function getOneByUserId(id: string) {
    return getOneByIdOrUser(id, true);
  }

  async function getOneByUsername(username: string) {
    const fields = "*, avatar:avatar_id(*)";

    return supabase
     .from("profiles")
     .select<typeof fields, Profile>(fields)
     .eq("username", username)
     .single();
  }

  async function create(dataToSave: Pick<Profile, "name" | "username" | "birthdate">) {
    return supabase
      .from("profiles")
      .insert(dataToSave)
      .select<"*", Profile>()
      .single();
  }

  async function updateAvatar(id: string, attachmentId: Attachment["id"]) {
    const fields = "*, avatar:avatar_id(*)";

    const { data, error } = await supabase
      .from("profiles")
      .update({ avatar_id: attachmentId })
      .eq("id", id)
      .select<typeof fields, Profile>(fields)
      .single();

    if(error != null) {
      throw new Error(error.message);
    }

    return data
  }

  return {
    getOneById,
    getOneByUserId,
    getOneByUsername,
    create,
    updateAvatar,
  }
}