import React from "react";
import { Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { Button, Icon, Logo, Screen, TextField } from "@components";

import { useSignUpModel } from "./sign-up.model";

export default function SignUp() {
  const { form, handleSubmit } = useSignUpModel();
  
  return (
    <Screen
    withSafeAreaView={true}>
      <View>
        <Logo />
      </View>
      <View className="mt-10">
        <View 
        className="mb-5">
          <Text
          className="text-5xl font-light font-base uppercase leading-tight color-white">
            {"LET'S\nCREATE AN"}
          </Text>
          <Text
          className="text-6xl font-bold font-base uppercase leading-tight color-white">
            {"ACCOUNT"}
          </Text>
        </View>
        <Text
        className="color-white text-2xl font-base">
          {"Enter your email down below to get started. It's pretty easy!"}
        </Text>
      </View>
      <View className="flex-1 justify-end">
        <View className="gap-y-3">
          <Controller 
          name="email"
          control={form.control}
          render={({ field }) => (
            <TextField
            value={field.value}
            autoComplete="email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Enter your email"
            onChangeText={field.onChange}
            icon={<Icon name="mail" color="white" size={20} />}>
            </TextField>
          )}
          />
          <Controller 
          name="password"
          control={form.control}
          render={({ field }) => (
            <TextField
            isPassword={true}
            value={field.value}
            autoCapitalize="none"
            autoComplete="password"
            onChangeText={field.onChange}
            placeholder="Enter your password"
            icon={<Icon name="lock" color="white" size={20} />}>
            </TextField>
          )}
          />
        </View>
        <Button
        className="mt-5"
        onPress={() => handleSubmit()}
        disabled={!form.formState.isValid}
        isSubmiting={form.formState.isSubmitting}>
          {"Submit!"}
        </Button>
      </View>
    </Screen>
  );
}