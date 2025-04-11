import React from "react";
import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCalendars, getLocales } from "expo-localization";
import { PrivateRouteList } from "app/routes/private.routes";
import { useMuralQuery } from "app/domain/useCases/useMuralQuery";
import { useNoteRepository } from "@infra/repositories/NoteRepository";
import { useSessionProfileQuery } from "app/domain/useCases/useSessionProfileQuery";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { CreateNoteSchema, CreateNoteSchemaType } from "app/domain/validations/CreateNoteSchema";

export function useCreateNoteModel() {
  // Navigation
  const navigation = useNavigation<NavigationProp<PrivateRouteList>>();
  const { params } = useRoute<RouteProp<PrivateRouteList, "CreateOrEditNote">>();

  // References
  const changeFieldDebounceRef = React.useRef<NodeJS.Timeout | null>(null);

  // Queries
  const profileQuery = useSessionProfileQuery({ refetchOnMount: false });
  const muralQuery = useMuralQuery(profileQuery.data?.id, { refetchOnMount: false });

  // Form hooks
  const form = useForm<CreateNoteSchemaType>({
    mode: "onChange",
    resolver: zodResolver(CreateNoteSchema),

    defaultValues: {
      title: params?.title ?? "",
      content: params?.content ?? "",
      created_at: params?.created_at,
    }
  });

  // Handlers
  const handleSubmit = form.handleSubmit(async ({ title, content, created_at }) => {
    const repository = useNoteRepository();

    const { data, error } = await repository.upsert({
      title,
      content,
      created_at,
      id: params?.id,
      mural_id: muralQuery.data?.id,
      owner_id: profileQuery.data?.id,
    });

    if(error) {
      return Alert.alert("Erro", error.message);
    }

    if(!params?.id) {
      navigation.setParams({ id: data.id });
    }
  }, (errors) => {
    console.log("Errors", errors);
  });

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

  function handleChangeField(field: keyof CreateNoteSchemaType, value: string) {
    form.setValue(field, value);

    if(changeFieldDebounceRef.current) {
      clearTimeout(changeFieldDebounceRef.current);
    }

    changeFieldDebounceRef.current = setTimeout(() => {
      handleSubmit();
    }, 1200);
  }

  return {
    form,
    handleFormatDate,
    handleChangeField,
  }
}