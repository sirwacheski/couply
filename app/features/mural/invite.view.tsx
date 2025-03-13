import React from "react";
import { Controller } from "react-hook-form";
import { KeyboardAvoidingView, Text, View } from "react-native";
import { Button, GoBackButton, Screen, TextField } from "@components";

import { useInviteModel } from "./invite.model";

export function InvitePartner() {
  const { form, handleSubmit } = useInviteModel();

  return (
    <KeyboardAvoidingView
    behavior="padding">
      <Screen
      withSafeAreaView={true}>
        <View>
          <GoBackButton />
        </View>
        <View className="mt-10">
          <Text
          className="text-6xl color-white">
            {"ADD\nYOUR"}
          </Text>
          <Text
          className="text-6xl font-bold color-white">
            {"PARTNER"}
          </Text>
        </View>
        <View className="mt-5">
          <Text className="text-2xl color-white">
            {"Invite your parter to join your mural by entering his or her username."}
          </Text>
        </View>
        <View className="flex-1 justify-end gap-y-5">
          <Controller 
          name="username"
          control={form.control}
          render={({ field }) => (
            <TextField 
            value={field.value}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={field.onChange}
            placeholder="Search by username"
            />
          )}
          />
          <Button
          onPress={() => handleSubmit()}
          disabled={!form.formState.isValid}
          isSubmiting={form.formState.isSubmitting}>
            {"Invite!"}
          </Button>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}