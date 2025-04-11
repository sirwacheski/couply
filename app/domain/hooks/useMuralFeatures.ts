import { ImageRequireSource } from "react-native";
import { NavigatorScreenParams } from "@react-navigation/native";
import { PrivateRouteList } from "app/routes/private.routes";

type MuralFeature = {
  title: string;
  icon: ImageRequireSource,
  goTo: NavigatorScreenParams<PrivateRouteList>
}

export function useMuralFeatures(): MuralFeature[] {
  const features = new Array<MuralFeature>();

  features.push({
    title: "Notes",
    goTo: { screen: "Notes" },
    icon: require("@assets/icons/journal-alt.png"),
  });

  return features;
}