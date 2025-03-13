import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Image, ImageRequireSource, Text, TouchableOpacity } from "react-native";

type TabMenu = {
  [key: string]: {
    label: string,
    icon: ImageRequireSource,
    filled: ImageRequireSource,
  }
}

export function BottomTabBar({ insets, state, navigation }: BottomTabBarProps) {
  const containerAnimStyle = useAnimatedStyle(() => ({
    height: 70,
    width: "90%",
    borderRadius: 35,
    paddingVertical: 12.5,
    alignSelf: "center",
    position: "absolute",
    bottom: insets.bottom,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F01448",
  }), [insets.bottom]);

  const TabMenu: TabMenu = {
    Mural: {
      label: "Home",
      icon: require("@assets/icons/house.png"),
      filled: require("@assets/icons/house-filled.png"),
    },
    UserProfile: {
      label: "Profile",
      icon: require("@assets/icons/user.png"),
      filled: require("@assets/icons/user-filled.png")
    }
  }

  return (
    <Animated.View
    style={containerAnimStyle}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { label, icon, filled } = TabMenu[route.name];
        
        return (
          <TouchableOpacity
          key={route.key}
          onPress={() => navigation.navigate(route.name)}
          className="flex-1 h-full items-center justify-between">
            <Image 
            className="w-6 h-6"
            resizeMode="contain"
            source={isFocused ? filled : icon}
            tintColor={isFocused ? "#fff" : "rgba(0, 0, 0, 0.5)"}
            />
            <Text
            className={`text-xs ${isFocused ? "text-white" : "text-black/50"}`}>
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </Animated.View>
  );
}