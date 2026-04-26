import { z } from "zod";
export const registerSchema = z.object({
  userName: z
    .string()
    .min(2, "Pls write more than 1 symbol")
    .max(16, "Pls write less than 16 symbols"),
  phoneNumber: z.string().regex(/^\+\d{9,15}$/, "Pls enter valid phone Number"),
  email: z.string().email("Pls enter valid email"),
  password: z
    .string()
    .min(6, "Write Minimum 6 symbols")
    .max(16, "Write Maximum 16 symbols"),
});

export const loginSchema = z.object({
  email: z.string().email("Pls enter valid email"),
  password: z
    .string()
    .min(6, "Write Minimum 6 symbols")
    .max(16, "Write Maximum 16 symbols"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Pls enter valid email"),
  password: z
    .string()
    .min(6, "Write Minimum 6 symbols")
    .max(16, "Write Maximum 16 symbols"),
  newPassword: z
    .string()
    .min(6, "Write Minimum 6 symbols")
    .max(16, "Write Maximum 16 symbols"),
});
