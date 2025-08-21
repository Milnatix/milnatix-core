import z from 'zod';

export const createCustomerSchema = z.object({
  fullName: z.string(),
  email: z.email().nullable(),
  phone: z.string().nullable(),
  federalDocument: z.string().nullable(),
  note: z.string().nullable(),
});

export type CreateCustomerFormData = z.infer<typeof createCustomerSchema>;
