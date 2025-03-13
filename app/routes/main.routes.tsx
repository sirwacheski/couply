import { useAtomValue } from "jotai";
import { SessionAtom } from "@atoms";

import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PublicRoutes from "./public.routes";
import PrivateRoutes from "./private.routes";

function useIsSignedIn() {
  const { user } = useAtomValue(SessionAtom);
  return !!user;
}

function useIsSignedOut() {
  const { user } = useAtomValue(SessionAtom);
  return !user;
}

const Stack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Public: {
      if: useIsSignedOut,
      screen: PublicRoutes,
    },
    Private: {
      if: useIsSignedIn,
      screen: PrivateRoutes,
    }
  },
});

export default createStaticNavigation(Stack);