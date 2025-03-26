import React from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Logo, Screen } from "@components";

import { useNotFoundMuralModel } from "./not-found.model";

export default function NotFoundMural() {
  const { navigation, inviteListQuery, acceptMutation } = useNotFoundMuralModel();

  return (
    <Screen
    withSafeAreaView={true}>
      <View>
        <Logo />
      </View>
      <View
      className="gap-y-5 mt-10">
        <View>
          <Text
          className="text-6xl font-base leading-tight text-white">
            {"CREATE\nOR JOIN"}
          </Text> 
          <Text
          className="text-6xl font-base font-bold leading-tight text-white">
            {"A MURAL"}
          </Text>
        </View>
        <Text
        className="text-2xl font-base text-white">
          {"Create or join into a mural to start enjoying the app with your partner!"}
        </Text>
      </View>
      <ScrollView
      className="pt-10">
        <Text
        className="text-white text-xl font-base font-light">
          {"Your invites"}
        </Text>
        <View
        className="mt-5">
          {inviteListQuery.data?.map((invite) => (
            <View
            key={invite.id}
            className="flex-row items-center">
              <View 
              className="flex-1 flex-row items-center gap-x-2">
                <Avatar 
                size={50}
                username={invite.inviter?.name}
                uri={invite.inviter?.avatar?.url}
                />
                <View>
                  <Text
                  numberOfLines={1}
                  className="text-white text-xl font-base">
                    {invite.mural?.title}
                  </Text>
                  <Text
                  numberOfLines={1}
                  className="text-white text-sm font-base">
                    by {invite.inviter?.name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
              disabled={acceptMutation.isPending}
              onPress={() => acceptMutation.mutateAsync(invite.id)}
              className="py-3 px-7 rounded-full bg-[#F01448]">
                {acceptMutation.isPending ? (
                  <ActivityIndicator size={"small"} color={"#fff"} />
                ) : (
                  <Text
                  className="text-white text-lg font-base">
                    {"Accept!"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <Button
      style="filled"
      onPress={() => navigation.navigate("CreateMural")}>
        {"Create my mural!"}
      </Button>
    </Screen>
  );
}