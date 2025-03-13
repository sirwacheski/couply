import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrivateRouteList } from "app/routes/private.routes";
import { useProfileRepository } from "@infra/repositories/ProfileRepository";
import { NavigationProp, StackActions, useNavigation } from "@react-navigation/native";
import { CreateProfileSchema, CreateProfileSchemaType } from "app/domain/validations/CreateProfileSchema";

export function useCreateProfileModel() {
  // Navigation
  const navigation = useNavigation<NavigationProp<PrivateRouteList>>();

  // Form
  const form = useForm<CreateProfileSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(CreateProfileSchema),
    defaultValues: {
      name: "",
      username: "",
    }
  });

  // Handlers
  const handleSubmit = form.handleSubmit(async (dataToCreate) => {
    const repository = useProfileRepository();
    const { data, error } = await repository.create(dataToCreate);
    
    if(error != null || !data) {
      return Alert.alert("Error", "It was not possible to create the profile. Please, try again later.");
    }

    navigation.dispatch(
      StackActions.replace("NotFoundMural")
    );
  });

  return {
    form,
    handleSubmit,
  }
}