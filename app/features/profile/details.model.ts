import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PrivateRouteList } from "app/routes/private.routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfileRepository } from "@infra/repositories/ProfileRepository";
import { useAttachmentRepository } from "@infra/repositories/AttachmentRepository";
import { useSessionProfileQuery } from "app/domain/useCases/useSessionProfileQuery";

export function useProfileDetailsModel() {
  // Queries hooks
  const queryClient = useQueryClient();
  const profileQuery = useSessionProfileQuery();

  // Navigation hooks
  const navigation = useNavigation<NavigationProp<PrivateRouteList>>();

  // Mutation hooks
  const changeAvatarMutation = useMutation({
    async mutationFn(file: ImagePicker.ImagePickerAsset) {
      const attachmentRepository = useAttachmentRepository();

      const attachment = await attachmentRepository.upload({
        uri: file.uri,
        type: file.mimeType!,
        size: file.fileSize!,
      });
      
      if(!profileQuery.data?.id) {
        throw new Error("Profile not found!");
      }
      
      const profileRepository = useProfileRepository();
      return profileRepository.updateAvatar(profileQuery.data?.id!, attachment.id);
    },
    onSuccess(updated) {
      queryClient.setQueryData(profileQuery.queryKey, updated);
      Alert.alert("Success", "Avatar changed successfully!");
    },
    onError(error) {
      Alert.alert("Error", error.message); 
    }
  });

  // Handlers
  async function handlePickAttachment() {
  }

  return {
    profileQuery,
    handlePickAttachment,
  }
}