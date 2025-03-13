import React from "react";
import { Text, View } from "react-native";
import { Controller } from "react-hook-form";
import { Button, Icon, Logo, Screen, TextField } from "@components";

import { useForgotPasswordModel } from "./forgot-password.model";

export default function ForgotPassword() {
  const { form, handleSubmit } = useForgotPasswordModel();

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
          className="text-5xl font-light font-base uppercase leading-tight color-white">
            {"Forgot"}
          </Text>
          <Text
          className="text-6xl font-bold font-base uppercase leading-tight color-white">
            {"password?"}
          </Text>
        </View>
        <Text
        className="text-2xl font-base color-white">
          {"Enter your email address and we'll send you a link to reset your password."}
        </Text>
      </View>
      <View
      className="flex-1 justify-end">
        <Controller 
        name="email"
        control={form.control}
        render={({ field }) => (
          <TextField
          autoComplete="email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your email"
          onChangeText={field.onChange}
          value={field.value}
          icon={<Icon name="mail" color="white" size={20} />}
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