import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLayout } from "./layouts/FormLayout";

const emailMin = 6;
const passwordMin = 4;
const passwordMax = 20;

const FormSchema = z.object({
  email: z
    .string()
    .email()
    .min(emailMin, `Email must be at least ${emailMin} characters.`),
  password: z
    .string()
    .min(
      passwordMin,
      `Password must not be less than ${passwordMin} characters.`,
    )
    .max(
      passwordMax,
      `Password must not be more than ${passwordMax} characters.`,
    )
    .regex(/[A-Z]/, "Password must contain capital characters.")
    .regex(/[a-z]/, "Password must contain lewercase characters.")
    .regex(/[0-9]/, "Password must contain numeric characters."),
});

export const SignupForm = () => {
  const SingUpHandler = () => {
    console.log("SingUpHandler");
  };



  return <FormLayout ButtonTitle="Sign Up" onSubmit={SingUpHandler} confirmField={true}/>
}
