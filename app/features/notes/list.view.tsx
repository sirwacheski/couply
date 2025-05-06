import React from "react";
import { NoteListCard } from "@components";
import { GoBackButton, Icon, Screen, TextField } from "@components";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useNoteListModel } from "./list.model";

export function NoteList() {
  const { notesListQuery, handleNavigateToCreateOrEditNote, handleSearchForNote, handleDeleteNote } = useNoteListModel();

  return (
    <Screen
    behavior={"padding"}
    withSafeAreaView={true}>
      <View>
        <GoBackButton />
      </View>
      <View 
      className="my-10 flex-row justify-between items-center">
        <Text
        className="font-base text-5xl color-white">
          {"Your\nNotes"}
        </Text>
        <TouchableOpacity
        onPress={() => handleNavigateToCreateOrEditNote()}
        className="w-16 h-16 items-center justify-center rounded-3xl bg-[#F01448]">
          <Icon
          size={24}
          name={"plus"}
          color={"white"}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TextField
        placeholder={"Search for title"}
        onChangeText={(text) => handleSearchForNote(text)}
        icon={<Icon name="search" color="#fff" size={18} />}
        />
      </View>
      <View
      className="flex-1 mt-10">
        <ScrollView
        showsVerticalScrollIndicator={false}>
          <View
          className="flex-row flex-wrap justify-between items-start gap-y-2">
            {notesListQuery.data?.map((item) => (
              <NoteListCard 
              item={item}
              key={item.id}
              onDelete={() => handleDeleteNote(item.id)}
              onSelect={() => handleNavigateToCreateOrEditNote(item)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </Screen>
  );  
}