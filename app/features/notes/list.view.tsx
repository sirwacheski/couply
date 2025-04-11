import React from "react";
import { GoBackButton, Icon, Screen, TextField } from "@components";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useNoteListModel } from "./list.model";

export function NoteList() {
  const { notesListQuery, handleFormatDate, handleNavigateToCreateOrEditNote } = useNoteListModel();

  return (
    <Screen
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
        placeholder={"Search for notes"}
        icon={<Icon name="search" color="#fff" size={18} />}
        />
      </View>
      <View
      className="flex-1 mt-10">
        <ScrollView
        refreshControl={(
          <RefreshControl 
          refreshing={notesListQuery.isRefetching}
          onRefresh={() => notesListQuery.refetch()}
          />
        )}>
          <View
          className="flex-row flex-wrap justify-between items-start gap-y-2">
            {notesListQuery.data?.map((item) => (
              <TouchableOpacity
              key={item.id}
              onPress={() => handleNavigateToCreateOrEditNote(item)}
              className="w-[49%] h-60 p-5 rounded-[30] bg-black/5">
                <View
                className="flex-row justify-between items-start">
                  <Text
                  numberOfLines={3}
                  className="flex-1 text-xl font-bold color-white">
                    {item.title}
                  </Text>
                  <TouchableOpacity
                  className="w-10 h-10 items-end">
                    <Icon
                    size={24}
                    color="#fff"
                    name="more-horizontal"
                    />
                  </TouchableOpacity>
                </View>
                <View
                className="flex-1 my-3">
                  <Text
                  numberOfLines={10}
                  className="color-white">
                    {item.content}
                  </Text>
                </View>
                <View>
                  <Text
                  numberOfLines={1}
                  className="font-light text-sm color-slate-50">
                    {handleFormatDate(new Date(item.created_at))}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Screen>
  );  
}