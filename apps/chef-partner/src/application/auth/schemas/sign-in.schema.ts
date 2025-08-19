import z from 'zod';

export const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type SignInFormData = z.infer<typeof signInSchema>;
