import { Note } from "app/domain/models/Note";
import { PrivateRouteList } from "app/routes/private.routes";
import { getCalendars, getLocales } from "expo-localization";
import { useMuralQuery } from "app/domain/useCases/useMuralQuery";
import { useRefetchOnFocus } from "app/domain/hooks/useRefetchOnFocus";
import { useNoteListQuery } from "app/domain/useCases/useNoteListQuery";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSessionProfileQuery } from "app/domain/useCases/useSessionProfileQuery";

export function useNoteListModel() {
  // Navigation
  const navigation = useNavigation<NavigationProp<PrivateRouteList>>();

  // Queries
  const profile = useSessionProfileQuery({ refetchOnMount: false });
  const muralQuery = useMuralQuery(profile.data?.id, { refetchOnMount: false });
  const notesListQuery = useNoteListQuery(muralQuery.data?.id);

  // Handlers
  function handleNavigateToCreateOrEditNote(note?: Note) {
    navigation.navigate("CreateOrEditNote", note);
  }

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

  // Side Effects
  useRefetchOnFocus(() => notesListQuery.refetch());

  return {
    notesListQuery,
    handleFormatDate,
    handleNavigateToCreateOrEditNote,
  }
}