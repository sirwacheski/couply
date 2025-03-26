import { PrivateRouteList } from "app/routes/private.routes";
import { NavigationProp, StackActions, useNavigation } from "@react-navigation/native"
import { useInviteListQuery } from "app/domain/useCases/useInviteListQuery";
import { useSessionProfileQuery } from "app/domain/useCases/useSessionProfileQuery";
import { useMuralRepository } from "@infra/repositories/MuralRepository";
import { Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";

export function useNotFoundMuralModel() {
  // Navigation hooks
  const navigation = useNavigation<NavigationProp<PrivateRouteList>>();

  // Query hooks
  const profileQuery = useSessionProfileQuery();
  const inviteListQuery = useInviteListQuery(profileQuery.data?.id);

  // Query Mutations
  const acceptMutation = useMutation({
    async mutationFn(id: string) {
      const repository = useMuralRepository();
      const { error } = await repository.acceptInvite(id);

      if(error != null) {
        throw new Error(error.message);
      }
    },

    onSuccess() {
      navigation.dispatch(StackActions.replace("Home"));
    },

    onError(error) {
      Alert.alert("Error", error.message);
    }
  });
  

  return {
    navigation,
    inviteListQuery,
    acceptMutation,
  }
}