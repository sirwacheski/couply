import { Mural } from "app/domain/models/Mural";
import { supabase } from "@infra/databases/supabase"
import { InvitePartner } from "app/domain/models/InvitePartner";

export function useMuralRepository() {
  async function getOne(profileId: string)  {
    const fields = "*, owner:owner_id(*, avatar:avatar_id(*)), partner:partner_id(*, avatar:avatar_id(*))";

    const { data, error } = await supabase
      .from("murals")
      .select<typeof fields, Mural>(fields)
      .or(`owner_id.eq.${profileId},partner_id.eq.${profileId}`)
      .single();

    if(error != null) {
      const { code } = error;
      
      if(code == "PGRST116") {
        return null;
      }

      throw new Error(error.message);
    }

    return data;
  }

  async function create(dataToSave: Pick<Mural, "owner_id" | "title" | "description">) {
    return supabase
      .from("murals")
      .insert(dataToSave)
      .select<"*", Mural>()
      .single();
  }

  async function invite(dataToSave: Pick<InvitePartner, "inviter_id" | "guest_id" | "mural_id">) {
    return supabase
     .from("invitations")
     .insert(dataToSave)
     .select<"*", InvitePartner>()
     .single();
  }

  async function getInvitesByProfile(profileId: string) {
    const fields = "*, mural:mural_id(title), inviter:inviter_id(name, avatar:avatar_id(url))";

    return supabase
    .from("invitations")
    .select<typeof fields, InvitePartner>(fields)
    .eq("guest_id", profileId);
  }

  async function acceptInvite(id: string) {
    return supabase.rpc("accept_invitation", {
      invite_id: id,
    });
  }

  return {
    getOne,
    create,
    invite,
    getInvitesByProfile,
    acceptInvite,
  }
}