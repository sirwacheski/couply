import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthRepository } from "@infra/repositories/AuthRepository";
import { ForgotPasswordSchema, ForgotPasswordSchemaType } from "app/domain/validations/ForgotPasswordSchema";

export function useForgotPasswordModel() {
  // Form
  const form = useForm<ForgotPasswordSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" }
  });

  // Handlers
  const handleSubmit = form.handleSubmit(async ({ email }) => {
    const authRepository = useAuthRepository();
    const { error } = await authRepository.sendForgetPasswordToken(email);

    if(error) {
      return Alert.alert("Error", error.message);
    }
  });

  return {
    form,
    handleSubmit
  }
}