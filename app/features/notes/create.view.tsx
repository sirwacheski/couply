import React from "react";
import { Controller } from "react-hook-form";
import { actions, RichToolbar } from "react-native-pell-rich-editor";
import { GoBackButton, Icon, Screen, RichTextEditor } from "@components";
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useCreateNoteModel } from "./create.model";

export function CreateNote() {
  const { form, richEditorRef,  handleFormatDate, handleChangeField } = useCreateNoteModel();

  return (
    <Screen
    behavior="padding"
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
          cursorColor={"white"}
          selectionColor={"white"}
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
          <RichTextEditor
          ref={richEditorRef}
          autoFocus={true}
          autoCorrect={true}
          value={field.value ?? ""}
          cssStyle="font-size: 18px;"
          onChange={(value) => handleChangeField(field.name, value)}
          />
        )}
        />
      </View>
      <RichToolbar 
      editor={richEditorRef}
      style={{
        height: 60,
        width: "100%",
        borderRadius: 100,
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
      flatContainerStyle={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
      actions={[
        actions.setBold,
        actions.setItalic,
        actions.setUnderline,
        actions.setStrikethrough,
        actions.insertOrderedList,
      ]}
      renderAction={(action: string, selected: boolean) => (
        <TouchableOpacity
        onPress={() => richEditorRef.current?.sendAction(action, "result")}>
          {action === actions.setBold ? (
            <Icon name="bold" size={25} color={selected ? "white" : "rgba(255,255,255, 0.7)"} />
          ) : action === actions.setItalic ? (
            <Icon name="italic" size={25} color={selected ? "white" : "rgba(255,255,255, 0.7)"} />
          ) : action === actions.setUnderline ? (
            <Icon name="underline" size={25} color={selected ? "white" : "rgba(255,255,255, 0.7)"} />
          ) : action === actions.setStrikethrough ? (
            <Image source={require("@assets/icons/strikethrough.png")} tintColor={selected ? "white" : "rgba(255,255,255, 0.7)"} style={{ width: 20, height: 20 }} />
          ) : action === actions.insertOrderedList && (
            <Icon name="list" size={25} color={selected ? "white" : "rgba(255,255,255, 0.7)"} />
          )}
        </TouchableOpacity>
      )}
      />
    </Screen>
  )
}