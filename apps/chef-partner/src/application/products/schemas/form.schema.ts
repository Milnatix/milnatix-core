import z from 'zod';

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'O nome deve ter pelo menos 1 caractere' }),
  description: z.string().nullable(),
  salePrice: z
    .number()
    .min(0.01, { message: 'O preço deve ser maior que zero' }),
  costPrice: z
    .number()
    .min(0, { message: 'O preço de custo não pode ser menor que zero' })
    .nullable(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
