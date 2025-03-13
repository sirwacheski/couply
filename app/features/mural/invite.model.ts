import { Alert } from "react-native";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { PrivateRouteList } from "app/routes/private.routes";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useMuralRepository } from "@infra/repositories/MuralRepository";
import { useProfileRepository } from "@infra/repositories/ProfileRepository";
import { InvitePartnerSchema } from "app/domain/validations/InvitePartnerSchema";

export function useInviteModel() {
  // Navigation hooks
  const { params } = useRoute<RouteProp<PrivateRouteList, "InvitePartner">>();

  // Form hooks
  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(InvitePartnerSchema),
    defaultValues: {
      username: "",
    }
  });

  // Handlers
  const handleSubmit = form.handleSubmit(async ({ username }) => {
    const profileRepository = useProfileRepository();
    const muralRepository = useMuralRepository();
    
    const guest = await profileRepository.getOneByUsername(username);

    if(guest.error != null) {
      return Alert.alert("Error", "This username does not exist!");
    }

    const invitation = await muralRepository.invite({ 
      guest_id: guest.data.id,
      mural_id: params.muralId,
      inviter_id: params.inviterId,
    });

    if(invitation.error != null) {
      const { code } = invitation.error;

      if(code == "22P02") {
        return Alert.alert("Error", "This user is already invited!");
      } else if (code == "23505") {
        return Alert.alert("Error", "You alredy invited your partner to this mural!");
      }

      return Alert.alert("Error", "Something went wrong!");
    }

    return Alert.alert("Success", "Invitation sent!");
  });

  return { form, handleSubmit }
}