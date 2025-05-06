import React from "react";
import { Note } from "app/domain/models/Note";
import { Text, TouchableOpacity, View } from "react-native";
import { getCalendars, getLocales } from "expo-localization";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { Icon } from "./Icon";
import { RichTextEditor, useRichTextEditorRef } from "./RichTextEditor";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type NoteListCardProps = {
  item: Note;
  onSelect?(): void;
  onDelete?(): void;
}

export function NoteListCard({ item, onSelect, onDelete }: NoteListCardProps) {
  // Common hooks
  const insets = useSafeAreaInsets();

  // References
  const richEditorRef = useRichTextEditorRef();
  const bottomSheetModalRef = React.useRef<BottomSheetModal | null>(null);

  // Handlers
  function handleFormatDate(date: Date) {
    const { languageTag } = getLocales().at(0)!;
    const { timeZone } = getCalendars().at(0)!;

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: timeZone!,
    }

    return Intl
      .DateTimeFormat(languageTag, options)
      .format(date);
  }

  // Renderers
  const renderModalBackdrop = React.useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop 
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    />
  ), []);

  // Side Effects
  React.useEffect(() => {
    if(richEditorRef.current && item?.content) {
      richEditorRef.current.setContentHTML(item.content);
    }
  }, [item.content]);

  return (
    <React.Fragment>
      <TouchableOpacity
      onPress={() => onSelect?.()}
      className="w-[49%] h-60 p-5 rounded-[30] bg-black/5">
        <View
        className="flex-row justify-between items-start">
          <Text
          numberOfLines={3}
          className="flex-1 text-xl font-bold color-white">
            {item.title}
          </Text>
          <TouchableOpacity
          className="w-10 items-end"
          onPress={() => bottomSheetModalRef.current?.present()}>
            <Icon
            size={24}
            color="#fff"
            name="more-horizontal"
            />
          </TouchableOpacity>
        </View>
        <View
        className="flex-1 my-3 overflow-hidden">
          <RichTextEditor
          ref={richEditorRef}
          enabled={false}
          onChange={() => {}}
          value={item.content ?? ""}
          />
        </View>
        <View>
          <Text
          numberOfLines={1}
          className="font-light text-sm color-slate-50">
            {handleFormatDate(new Date(item.created_at))}
          </Text>
        </View>
      </TouchableOpacity>
      <BottomSheetModal
      ref={bottomSheetModalRef}
      backdropComponent={renderModalBackdrop}>
        <BottomSheetView
        className="px-5 pb-10">
          <TouchableOpacity
          className="w-full h-14 flex-row items-center gap-x-3"
          onPress={() => {
            bottomSheetModalRef.current?.close();
            onDelete?.();
          }}>
            <Icon
            size={25}
            name="trash-2"
            color="#F01448"
            />
            <Text
            className="text-xl font-base color-black">
              {"Delete Note"}
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </React.Fragment>
  )
}