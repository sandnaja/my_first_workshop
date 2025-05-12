import { z, ZodSchema } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2, { message: "First Name ต้องมีอย่างน้อย 2 ตัว" }),
  lastName: z.string().min(2, { message: "Last Name ต้องมีอย่างน้อย 2 ตัว" }),
  userName: z.string().min(2, { message: "Username ต้องมีอย่างน้อย 2 ตัว" }),
});



export const validateWithZod = <T> (schema: ZodSchema<T>, data: unknown):T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
};