import { authApi } from "@/entites/user/api/auth";
import type { AxiosError } from "axios";
import { z } from "zod";

const formSchemaConst={
 emailMin:6,
  passwordMin:4,
  passwordMax:20,

}
export const signUpFormSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(formSchemaConst.emailMin, `Email must be at least ${formSchemaConst.emailMin} characters.`),
    password: z
      .string()
      .min(
       formSchemaConst.passwordMin,
        `Password must not be less than ${formSchemaConst.passwordMin} characters.`,
      )
      .max(
       formSchemaConst.passwordMax,
        `Password must not be more than ${formSchemaConst.passwordMax} characters.`,
      )
      .regex(/[A-Z]/, "Password must contain capital characters.")
      .regex(/[a-z]/, "Password must contain small characters.")
      .regex(/[0-9]/, "Password must contain numeric characters."),

    confirmPassword: z
      .string()
      .min(
       formSchemaConst.passwordMin,
        `Password must not be less than ${formSchemaConst.passwordMin} characters.`,
      )
      .max(
        formSchemaConst.passwordMax,
        `Password must not be more than ${formSchemaConst.passwordMax} characters.`,
      )
      .regex(/[A-Z]/, "Password must contain capital characters.")
      .regex(/[a-z]/, "Password must contain small characters.")
      .regex(/[0-9]/, "Password must contain numeric characters.")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignupFormData = z.infer<typeof FormSchema>;
export const useSignup = () => {
  authApi
    .signup({ email: "admin@mail.ru", password: "1234" })
    .then((resp) => console.log(resp.data.message))
    .catch((error: AxiosError<{ error: string }>) => {
      console.log(error.response?.data.error);
    });
};
