import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, Logo, Screen } from "@components";

import { useNotFoundMuralModel } from "./not-found.model";

export default function NotFoundMural() {
  const { navigation } = useNotFoundMuralModel();

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
        className="text-xl font-base text-white">
          {"Your invites"}
        </Text>
      </ScrollView>
      <Button
      style="filled"
      onPress={() => navigation.navigate("CreateMural")}>
        {"Create my mural!"}
      </Button>
    </Screen>
  );
}