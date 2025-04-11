import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export function useRefetchOnFocus(refetch: () => void) {
  useFocusEffect(React.useCallback(() => {
    refetch();
  }, []));
}