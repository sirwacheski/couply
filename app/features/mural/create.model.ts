import { Alert } from "react-native";
import { useAtomValue } from "jotai";
import { SessionAtom } from "@atoms";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useMuralRepository } from "@infra/repositories/MuralRepository";
import { CreateMuralSchema, CreateMuralSchemaType } from "app/domain/validations/CreateMuralSchema";
import { useProfileRepository } from "@infra/repositories/ProfileRepository";

export function useCreateMuralModel() {
  // Atoom hooks
  const { user } = useAtomValue(SessionAtom);

  // Navigation hooks
  const navigation = useNavigation();

  // Form hooks
  const form = useForm<CreateMuralSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(CreateMuralSchema),
    defaultValues: {
      title: "",
      description: "",
    }
  });

  // Handlers
  const handleSubmit = form.handleSubmit(async ({ title, description }) => {
    const muralRepository = useMuralRepository();
    const profileRepository = useProfileRepository();

    const profile = await profileRepository.getOneByUserId(user?.id!);

    if(profile.error != null) {
      return Alert.alert("Error", profile.error.message);
    }

    const mural = await muralRepository.create({ 
      title, 
      description,
      owner_id: profile.data.id,
    });

    if(mural.error != null) {
      return Alert.alert("Error", mural.error.message);
    }

    navigation.dispatch(StackActions.replace("Home"));
  });

  return {
    form,
    handleSubmit,
  }
}