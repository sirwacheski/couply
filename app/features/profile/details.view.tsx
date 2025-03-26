import React from "react";
import { Text, View } from "react-native";
import { AttachmentPickerBottomSheet, Avatar, Logo, Screen, useAttachmentPickerBottomSheet } from "@components";

import { useProfileDetailsModel } from "./details.model";

export default function ProfileDetails() {
  // Model hooks
  const { profileQuery, handlePickAttachment } = useProfileDetailsModel();

  // Reference hooks
  const attachmentPickerRef = useAttachmentPickerBottomSheet();
  
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
        onPressChangeButton={() => attachmentPickerRef.current?.show()}
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

      <AttachmentPickerBottomSheet
      ref={attachmentPickerRef}
      onPick={handlePickAttachment}
      />
    </Screen>
  );
}