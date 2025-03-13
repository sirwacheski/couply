import { PrivateRouteList } from "app/routes/private.routes";
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useInviteListQuery } from "app/domain/useCases/useInviteListQuery";
import { useSessionProfileQuery } from "app/domain/useCases/useSessionProfileQuery";

export function useNotFoundMuralModel() {
  // Navigation hooks
  const navigation = useNavigation<NavigationProp<PrivateRouteList>>();

  // Query hooks
  const profileQuery = useSessionProfileQuery();
  const inviteListQuery = useInviteListQuery(profileQuery.data?.id);

  return {
    navigation,
    inviteListQuery,
  }
}