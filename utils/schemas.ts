import { z, ZodSchema } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2, { message: "First Name ต้องมีอย่างน้อย 2 ตัว" }),
  lastName: z.string().min(2, { message: "Last Name ต้องมีอย่างน้อย 2 ตัว" }),
  userName: z.string().min(2, { message: "Username ต้องมีอย่างน้อย 2 ตัว" }),
});

const ValidateImage = () => {
  const maxFileSize = 1024 * 1024;
  return z.instanceof(File)
  .refine((file) => {
  return file.size <= maxFileSize 
  }, 'File size must be less than 1MB')
}

export const imageSchema = z.object({
  image: ValidateImage()
})

export const landmarkSchema = z.object({
  name: z.string()
  .min(2, { message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" })
  .max(30, { message: "ชื่อต้องไม่เกิน 30 ตัวอักษร" }),
  category: z.string(),
  description: z.string()
  .min(2, { message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" })
  .max(100, { message: "ชื่อต้องไม่เกิน 100 ตัวอักษร" }),
  price: z.coerce.number().int().min(0, { message: "ราคาต้องมากกว่า 0" }),
  province: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
})

export const validateWithZod = <T> (schema: ZodSchema<T>, data: unknown):T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return result.data;
};