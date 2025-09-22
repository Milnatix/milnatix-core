import z from 'zod';

export const addressFormSchema = z.object({
  street: z.string(),
  number: z.string().nullable(),
  complement: z.string().nullable(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string().nullable(),
});

export type AddressFormData = z.infer<typeof addressFormSchema>;
