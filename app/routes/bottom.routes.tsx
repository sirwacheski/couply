import React from "react";
import { BottomTabBar } from "@components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import Mural from "@features/mural/home.view";
import ProfileDetails from "@features/profile/details.view";

export type BottomRouteList = {
  Mural: undefined;
  UserProfile: undefined;
}

export const BottomRoutes = createBottomTabNavigator<BottomRouteList>({
  screens: {
    Mural: Mural,
    UserProfile: ProfileDetails,
  },
  screenOptions: {
    headerShown: false,
  },
  tabBar: (props) => <BottomTabBar {...props} />,
});