import React from "react";
import { Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { Button, Icon, Logo, Screen, TextField } from "@components";

import { useConfirmTokenModel } from "./confirm-token.model";

export default function ConfirmToken() {
  const { form, handleSubmit } = useConfirmTokenModel();

  return (
    <Screen
    withSafeAreaView={true}>
      <View>
        <Logo />
      </View>
      <View
      className="mt-10">
        <View
        className="mb-3">
          <Text
          className="text-5xl font-light uppercase color-white">
            {"Enter the"}
          </Text>
          <Text
          className="text-6xl font-bold uppercase  color-white">
            {"code"}
          </Text>
        </View>
        <Text
        className="text-2xl color-white">
          {"Enter the verification code sent to your email address to confirm your account."}
        </Text>
      </View>
      <View
      className="flex-1 justify-end">
        <Controller 
        name="code"
        control={form.control}
        rules={{ 
          minLength: 6,
          maxLength: 6,
          required: true,
        }}
        render={({ field }) => (
          <TextField
          maxLength={6}
          autoCapitalize="none"
          keyboardType="numeric"
          placeholder="Enter the code"
          autoComplete="one-time-code"
          onChangeText={field.onChange}
          value={field.value}
          icon={<Icon name="lock" color="white" size={20} />}
          />
        )}
        />
        <Button
        className="mt-3"
        onPress={() => handleSubmit()}
        disabled={!form.formState.isValid}
        isSubmiting={form.formState.isSubmitting}>
          {"Send!"}
        </Button>
      </View>
    </Screen>
  );
}