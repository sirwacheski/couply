import { Alert } from "react-native";
import { AttachmentAsset } from "@components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfileRepository } from "@infra/repositories/ProfileRepository";
import { useAttachmentRepository } from "@infra/repositories/AttachmentRepository";
import { useSessionProfileQuery } from "app/domain/useCases/useSessionProfileQuery";

export function useProfileDetailsModel() {
  // Queries hooks
  const queryClient = useQueryClient();
  const profileQuery = useSessionProfileQuery();

  // Mutation hooks
  const changeAvatarMutation = useMutation({
    async mutationFn(file: AttachmentAsset) {
      const attachmentRepository = useAttachmentRepository();

      const attachment = await attachmentRepository.upload({
        uri: file.uri,
        type: file.type,
        size: file.size,
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
  async function handlePickAttachment(assets: AttachmentAsset[]) {
    const asset = assets.at(0)!;
    changeAvatarMutation.mutate(asset);
  }

  return {
    profileQuery,
    handlePickAttachment,
  }
}