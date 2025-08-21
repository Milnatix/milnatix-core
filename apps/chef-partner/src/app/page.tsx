'use client';

import {
  SignInFormData,
  signInSchema,
} from '@/application/auth/schemas/sign-in.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Input from '@/components/atom/Input';
import Button from '@/components/atom/Button';
import Card from '@/components/atom/Card';
import { useAlertStore } from '@/shared/stores/alert.store';
import { AuthService } from '@/services/auth.service';

const authService = new AuthService();

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { showAlert: show } = useAlertStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
  });

  const goToHome = () => {
    router.replace('/home');
  };

  const onSubmit = async (data: SignInFormData) => {
    //TODO: Verificar forma de melhorar isso aqui?
    const response = await authService.signIn({
      ...data,
      suiteId: 'chef-partner',
    });
    if (!response.success) {
      show({
        title: 'Atenção!',
        message: response.error.message,
        type: 'error',
        duration: 10000,
      });
      return;
    }

    goToHome();
  };

  return (
    <div className="h-[100dvh] w-[100dvw] justify-center items-center flex flex-col bg-gradient-app">
      <Card className="flex flex-col items-center gap-2">
        <h1 className="text-3xl">ChefPartner</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <Input
            type="email"
            label="E-mail"
            error={errors.email?.message}
            autoFocus
            {...register('email')}
          />
          <Input
            type="password"
            label="Senha"
            error={errors.password?.message}
            {...register('password')}
          />
          <Button type="submit" variant="primary" loading={isSubmitting}>
            Acessar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
