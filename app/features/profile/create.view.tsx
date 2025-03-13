import React from "react";
import { Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { Button, DateField, Icon, Logo, Screen, TextField } from "@components";

import { useCreateProfileModel } from "./create.model";

export default function CreateProfile() {
  const { form, handleSubmit } = useCreateProfileModel();

  return (
    <Screen
    withSafeAreaView={true}>
      <View>
        <Logo />
      </View>
      <View className="mt-10">
        <View className="mb-3">
          <Text
          className="text-4xl font-light font-base uppercase text-white">
            {"Create a"}
          </Text>
          <Text
          className="text-6xl font-bold font-base uppercase leading-tight text-white">
            {"Profile"}
          </Text>
        </View>
        <Text
        className="text-2xl font-base text-white">
          {"Create a profile to start enjoying the app with your partner."}
        </Text>
      </View>
      <View
      className="flex-1 justify-end">
        <View 
        className="gap-y-3">
          <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <TextField 
            value={field.value}
            autoComplete="name"
            autoCapitalize="words"
            onChangeText={field.onChange}
            placeholder="Enter your name"
            icon={<Icon name="user" color="white" size={20} />}
            />
          )}
          />
          <Controller
          name="username"
          control={form.control}
          render={({ field }) => (
            <TextField 
            value={field.value}
            autoCapitalize="none"
            autoComplete="username"
            placeholder="Enter your username"
            icon={<Text className="text-white text-2xl">{"@"}</Text>}
            onChangeText={(text) => field.onChange(text.replace(/\s/g, ""))}
            />
          )}
          />
          <Controller
          name="birthdate"
          control={form.control}
          render={({ field }) => (
            <DateField
            date={field.value}
            onChange={field.onChange}
            placeholder="Enter your birthdate"
            icon={<Icon name="calendar" color="white" size={20} />}
            />
          )}
          />
        </View>
        <Button
        className="mt-10"
        onPress={() => handleSubmit()}
        disabled={!form.formState.isValid}
        isSubmiting={form.formState.isSubmitting}>
          {"Submit!"}
        </Button>
      </View>
    </Screen>
  );
}