import React from "react";
import { useSetAtom } from "jotai";
import { SessionAtom } from "@atoms";
import * as SplashScreen from "expo-splash-screen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuthRepository } from "@infra/repositories/AuthRepository";

import QueryProvider from "./QueryProvider";

SplashScreen.preventAutoHideAsync();

export default function ApplicationProvider({ children }: React.PropsWithChildren) {
  const setSessionAtom = useSetAtom(SessionAtom);

  async function getLoggedUser() {
    const repository = useAuthRepository();
    const { data, error } = await repository.getLoggedSession();

    if(!data?.session || error) {
      return undefined;
    }

    return data.session.user;
  }

  React.useEffect(() => {
    async function initialize() {
      const user = await getLoggedUser();

      if(user != undefined) {
        setSessionAtom({ user });
      }

      setTimeout(SplashScreen.hideAsync, 600);
    }

    initialize();
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}