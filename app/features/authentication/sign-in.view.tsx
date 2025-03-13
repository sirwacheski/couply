import React from "react";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, Icon, Logo, Screen, TextField } from "@components";

import useSignInModel from "./sign-in.model";

export default function SignIn() {
  const { form, handleSubmit, navigation } = useSignInModel();

  return (
    <Screen
    withSafeAreaView={true}>
      <View 
      className="flex-1">
        <Logo />
        <View
        className="mt-10 gap-y-5">
          <View>
            <Text
            className="text-6xl font-light font-base uppercase leading-tight color-text">
              {"Welcome"}
            </Text>
            <Text
            className="text-6xl font-bold font-base uppercase leading-tight color-text">
              {"Back!"}
            </Text>
          </View>
          <Text
          className="text-2xl font-light font-base color-text">
            {"Sign in to your account to access your mural!"}
          </Text>
        </View>
      </View>
      <View>
        <View
        className="gap-y-3">
          <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <TextField
            autoComplete="email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Enter your email"
            value={field.value}
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
            onChangeText={field.onChange}
            placeholder="Enter your password"
            icon={<Icon name="lock" color="white" size={20} />}>
            </TextField>
          )}
          />
          <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}>
            <Text
            className="text-right text-lg font-medium font-base color-white">
              {"Forgot password?"}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
        className="mt-10"
        onPress={() => handleSubmit()}
        disabled={!form.formState.isValid}
        isSubmiting={form.formState.isSubmitting}>
          {"Sign in"}
        </Button>
      </View>
    </Screen>
  )
}