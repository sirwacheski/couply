import { Alert } from "react-native";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { PublicRouteList } from "app/routes/public.routes";
import { useAuthRepository } from "@infra/repositories/AuthRepository";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { EmailPasswordSchema, EmailPasswordSchemaType } from "app/domain/validations/EmailPasswordSchema";

export function useSignUpModel() {
  // Navigation hooks
  const navigation = useNavigation<NavigationProp<PublicRouteList>>();

  // Form hooks
  const form = useForm<EmailPasswordSchemaType>({
    mode: "onChange",
    resolver: zodResolver(EmailPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handlers
  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    const authRepository = useAuthRepository();
    const { error } = await authRepository.signUpWithEmailProvider(email, password);

    if(error != null) {
      return Alert.alert("Error", error.message);
    }

    navigation.navigate("ConfirmToken", { email });
  });
  
  return {
    form,
    handleSubmit
  }
}