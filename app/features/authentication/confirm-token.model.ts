import React from "react";
import { useSetAtom } from "jotai";
import { Alert } from "react-native";
import { SessionAtom } from "@atoms";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { PublicRouteList } from "app/routes/public.routes";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useAuthRepository } from "@infra/repositories/AuthRepository";
import ConfirmTokenSchema from "app/domain/validations/ConfirmTokenSchema";

export function useConfirmTokenModel() {
  // Atom hooks
const setSessionAtom = useSetAtom(SessionAtom);

  // Navigation hooks
  const { params } = useRoute<RouteProp<PublicRouteList, "ConfirmToken">>();

  // Form hooks
  const form = useForm({
    mode: "onSubmit",
    resolver: zodResolver(ConfirmTokenSchema),
    defaultValues: {
      email: "",
      code: "",
    }
  });

  // Handlers
  const handleSubmit = form.handleSubmit(async ({ email, code }) => {
    const authRepository = useAuthRepository();
    const { error, data } = await authRepository.confirmOtpToken(email, code);

    if(error) {
      return Alert.alert("Error", "Token is invalid or");
    }

    const { user } = data;

    setSessionAtom((previous) => ({ ...previous, user }));
  });

  // Side Effects
  React.useEffect(() => {
    form.setValue("email", params?.email ?? "");

    if(params?.code != undefined) {
      form.setValue("code", params.code);
      handleSubmit();
    }
  }, [params]);

  return {
    form,
    handleSubmit,
  }
}