import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PrivateRouteList } from "app/routes/private.routes";
import { useMuralQuery } from "app/domain/useCases/useMuralQuery";
import { useMuralFeatures } from "app/domain/hooks/useMuralFeatures";
import { useSessionProfileQuery } from "app/domain/useCases/useSessionProfileQuery";
import { NavigationProp, StackActions, useNavigation } from "@react-navigation/native";

export function useMuralModel() {
  // Navigation hooks
  const navigation = useNavigation<NavigationProp<PrivateRouteList>>();

  // Domain hooks
  const muralFeatures = useMuralFeatures();

  // Query client
  const queryClient = useQueryClient();

  // Query hooks
  const profileQuery = useSessionProfileQuery();
  const muralQuery = useMuralQuery(profileQuery.data?.id);

  // Handlers
  function handleNavigateToInvitePartner() {
    navigation.navigate("InvitePartner", {
      muralId: muralQuery.data!.id,
      inviterId: profileQuery.data!.id,
    });
  }

  // Side effects
  React.useEffect(() => {
    const { isFetched, error, data } = profileQuery;
    
    if(isFetched && !error) {
      const hasProfile = !!data;

      if(!hasProfile) {
        navigation.dispatch(StackActions.replace("CreateProfile"));
        setTimeout(() => queryClient.removeQueries({ queryKey: profileQuery.queryKey }), 600);
      }
    }
  }, [profileQuery.isFetched]);

  React.useEffect(() => {
    const { isFetched, error, data } = muralQuery;

    if(isFetched && !error) {
      const hasMural = !!data;

      if(!hasMural) {
        navigation.dispatch(StackActions.replace("NotFoundMural"));
        setTimeout(() => queryClient.removeQueries({ queryKey: muralQuery.queryKey }), 600);
      }
    }
  }, [muralQuery.isFetched]);

  return {
    muralQuery,
    muralFeatures,
    handleNavigateToInvitePartner,
  }
}