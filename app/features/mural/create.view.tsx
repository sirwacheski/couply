import React from "react";
import { Controller } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { Button, Icon, Logo, Screen, TextField } from "@components";

import { useCreateMuralModel } from "./create.model";

export default function CreateMural() {
  const { form, handleSubmit } = useCreateMuralModel();

  return (
    <Screen
    withSafeAreaView={true}>
      <View>
        <Logo />
      </View>
      <View
      className="mt-10 gap-y-5">
        <View>
          <Text
          className="text-6xl font-base font-light leading-tight uppercase text-white">
            {"Create\nyour"}
          </Text>
          <Text
          className="text-6xl font-base font-bold leading-tight uppercase text-white">
            {"Mural"}
          </Text>
        </View>
        <Text
        className="text-2xl font-base text-white">
          {"Create your mural and share it with your partener!"}
        </Text>
      </View>
      <View
      className="flex-1 mt-10">
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-y-5">
          <Controller 
          name={"title"}
          control={form.control}
          render={({ field }) => (
            <TextField
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Enter the mural title"
            icon={<Icon name="type" color="white" size={20} />}>
            </TextField>
          )}
          />
          <Controller 
          name={"description"}
          control={form.control}
          render={({ field }) => (
            <TextField
            multiline={true}
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Enter the mural description (optional)">
            </TextField>
          )}
          />
        </ScrollView>
        <Button
        className="mt-5"
        disabled={!form.formState.isValid}
        isSubmiting={form.formState.isSubmitting}
        onPress={() => handleSubmit()}>
          {"Create!"}
        </Button>
      </View>
    </Screen>
  );
}