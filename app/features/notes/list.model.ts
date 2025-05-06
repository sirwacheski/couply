import React from "react";
import { Note } from "app/domain/models/Note";
import { RichEditor } from "react-native-pell-rich-editor";
import { PrivateRouteList } from "app/routes/private.routes";
import { useMuralQuery } from "app/domain/useCases/useMuralQuery";
import { useRefetchOnFocus } from "app/domain/hooks/useRefetchOnFocus";
import { useNoteListQuery } from "app/domain/useCases/useNoteListQuery";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSessionProfileQuery } from "app/domain/useCases/useSessionProfileQuery";
import { useNoteRepository } from "@infra/repositories/NoteRepository";
import { Alert } from "react-native";

export function useNoteListModel() {
  // References
  const searchDebounceRef = React.useRef<NodeJS.Timeout | null>(null);
  const richTextEditorRef = React.useRef<RichEditor | null>(null);

  // States
   const [search, setSearch] = React.useState<string>();

  // Navigation
  const navigation = useNavigation<NavigationProp<PrivateRouteList>>();

  // Queries
  const profile = useSessionProfileQuery({ refetchOnMount: false });
  const muralQuery = useMuralQuery(profile.data?.id, { refetchOnMount: false });
  const notesListQuery = useNoteListQuery(muralQuery.data?.id, search);

  // Handlers
  function handleNavigateToCreateOrEditNote(note?: Note) {
    navigation.navigate("CreateOrEditNote", note);
  }

  function handleSearchForNote(text: string) {
    if(searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      setSearch(text);
    }, 300);
  }

  async function handleDeleteNote(id: Note["id"]) {
    const repository = useNoteRepository();
    const { error } = await repository.disable(id);

    if(error) {
      return Alert.alert("Error", "Something went wrong while deleting the note.");
    }

    notesListQuery.refetch();
  }

  // Side Effects
  useRefetchOnFocus(() => notesListQuery.refetch());

  return {
    notesListQuery,
    richTextEditorRef,
    handleSearchForNote,
    handleNavigateToCreateOrEditNote,
    handleDeleteNote
  }
}