import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Logo, Screen, BottomSheet, useBottomSheet, Icon } from "@components";

import { useProfileDetailsModel } from "./details.model";

export default function ProfileDetails() {
  // Common hooks
  const insets = useSafeAreaInsets();

  // Reference hooks
  const bottomSheetRef = useBottomSheet();

  // Model hooks
  const { profileQuery, handlePickAttachment } = useProfileDetailsModel();
  
  return (
    <Screen
    withSafeAreaView={true}>
      <View>
        <Logo />
      </View>
      <View
      className="justify-center items-center mt-10">
        <Avatar 
        size={120}
        withChangeButton={true}
        username={profileQuery.data?.name}
        uri={profileQuery.data?.avatar?.url}
        onPressChangeButton={() => handlePickAttachment()}
        />
        <View
        className="mt-10">
          <Text
          numberOfLines={1}
          className="text-3xl text-center font-base text-white">
            {profileQuery.data?.name}
          </Text>
          <Text
          numberOfLines={1}
          className="text-xl text-center font-base text-white">
            {profileQuery.data?.username}
          </Text>
        </View>
      </View>
    </Screen>
  );
}