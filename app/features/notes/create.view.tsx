import React from "react";
import { Controller } from "react-hook-form";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { GoBackButton, Icon, Screen } from "@components";

import { useCreateNoteModel } from "./create.model";

export function CreateNote() {
  const { form, handleFormatDate, handleChangeField } = useCreateNoteModel();

  return (
    <Screen
    withSafeAreaView={true}>
      <View
      className="flex-row justify-between items-center">
        <View 
        className="flex-1">
          <GoBackButton />
        </View>
        <View>
          {form.formState.isSubmitting && (
            <ActivityIndicator 
            size={"small"}
            color={"white"}
            />
          )}
        </View>
      </View>
      <View
      className="mt-5">
        <Controller 
        name="title"
        control={form.control}
        render={({ field }) => (
          <TextInput
          multiline={true}
          placeholder="Title"
          value={field.value}
          placeholderTextColor={"rgba(255,255,255,0.75)"}
          className="w-full font-base text-4xl color-white"
          onChangeText={(value) => handleChangeField(field.name, value)}
          />
        )}
        />
        <View
        className="mt-3 flex-row items-center gap-x-2">
          <Icon 
          size={16}
          name="calendar"
          color={"rgba(0,0,0,0.3)"}
          />
            <Controller 
            name="created_at"
            control={form.control}
            render={({ field }) => (
              <Text
              className="color-black/30 capitalize">
                {handleFormatDate(field.value ? new Date(field.value) : new Date())}
              </Text>
            )}
            />
        </View>
      </View>
      <View
      className="mt-5 flex-1">
        <Controller 
        name="content"
        control={form.control}
        render={({ field }) => (
          <TextInput
          multiline={true}
          autoFocus={true}
          textAlign="left"
          value={field.value}
          textAlignVertical="top"
          className="flex-1 color-white font-base text-xl"
          onChangeText={(value) => handleChangeField(field.name, value)}
          />
        )}
        />
      </View>
    </Screen>
  )
}