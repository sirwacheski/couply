import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PublicRouteList } from "app/routes/public.routes";

export function useGreetingsModel() {
  // Navigation hooks
  const navigation = useNavigation<NavigationProp<PublicRouteList>>();

  return {
    navigation,
  }
}