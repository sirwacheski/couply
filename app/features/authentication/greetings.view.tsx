import React from "react";
import { Button, Logo, Screen } from "@components";
import { Text, TouchableOpacity, View } from "react-native";

import { useGreetingsModel } from "./greetings.model";

export default function Greetings() {
  const { navigation } = useGreetingsModel();
  
  return (
    <Screen
    withSafeAreaView={true}>
      <View>
        <Logo />
      </View>
      <View
      className="flex-1 justify-end">
        <View
        className="gap-y-3">
          <View>
            <Text 
            className="text-6xl uppercase font-light font-base leading-tight color-white">
              {"It's\nbetter"}
            </Text>
            <Text
            className="text-6xl uppercase font-extrabold font-base leading-tight color-white">
              {"Together"}
            </Text>
          </View>
          <Text
          className="text-xl text-left font-base color-white">
            {"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </Text>
        </View>
        <View 
        className="mt-28 gap-y-5">
          <Button
          onPress={() => navigation.navigate("SignUp")}>
            {"Get Started"}
          </Button>
          <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}>
            <Text className="text-center text-xl font-base color-white">
              {"Or"}
              &nbsp;
              <Text className="text-xl font-semibold color-white">
                {"Sign In"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}