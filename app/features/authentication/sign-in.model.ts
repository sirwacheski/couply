import { useSetAtom } from "jotai";
import { Alert } from "react-native";
import { SessionAtom } from "@atoms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PublicRouteList } from "app/routes/public.routes";
import { useAuthRepository } from "app/infra/repositories/AuthRepository";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { EmailPasswordSchema, EmailPasswordSchemaType } from "app/domain/validations/EmailPasswordSchema";

export default function useSignInModel() {
  // Navigation hooks
  const navigation = useNavigation<NavigationProp<PublicRouteList>>();

  // Atom hooks
  const setSessionAtom = useSetAtom(SessionAtom);

  // Form hooks
  const form = useForm<EmailPasswordSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(EmailPasswordSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Handlers
  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    const authRepository = useAuthRepository();
    const { data, error } = await authRepository.signInWithEmailProvider(email, password);

    if(error != null) {
      return Alert.alert("Error", error.message);
    }

    const { user } = data.session!;
    
    setSessionAtom((previous) => ({ ...previous, user }));
  });

  return {
    form,
    handleSubmit,
    navigation,
  }
}