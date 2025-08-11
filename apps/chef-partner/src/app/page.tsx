"use client"

import { SignInFormData, signInSchema } from "@/application/schemas/auth/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react"
import { signIn, setSession } from "@/application/facades/auth.facade";
import { useRouter } from 'next/navigation';

export const LoginPage: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
  });

  const goToHome = () => {
    router.push("/home");
  };

  const onSubmit = async (data: SignInFormData) => {
    const response = await signIn(data);
    if (!response.success) {
      return;
    }

    setSession(response.value!);
    goToHome();
  };

  return (
    <div className="h-[100dvh] w-[100dvw] justify-center items-center flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root size="md" maxW="md">
          <Stack>
            <Fieldset.Legend>ChefPartner</Fieldset.Legend>
          </Stack>
          <Field.Root invalid={!!errors.email}>
            <Field.Label >Email</Field.Label>
            <Input type="email" autoFocus {...register("email")} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.password}>
            <Field.Label>Senha</Field.Label>
            <Input type="password" {...register("password")} />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>
          <Button type="submit" loading={isSubmitting}>Entrar</Button>
        </Fieldset.Root>
      </form>
    </div>
  )
}

export default LoginPage