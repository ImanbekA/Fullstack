import { z } from "zod";

export const registrationSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Некорректный email"),
  nickname: z
    .string()
    .min(3, "Минимум 3 символа")
    .max(20, "Максимум 20 символов"),
  phone: z
    .string()
    .min(1, "Телефон обязателен")
    .regex(/^\+?[0-9]{10,15}$/, "Некорректный номер телефона"),
  password: z
    .string()
    .min(8, "Минимум 8 символов")
    .max(100, "Слишком длинный пароль"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Некорректный email"),
  password: z
    .string()
    .min(1, "Пароль обязателен"),
});

export type LoginFormData = z.infer<typeof loginSchema>;