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
import { signUpFormSchema} from "../model/useSignup";
import { ROUTES } from "@/shared/router/constants";
import { Routes } from "react-router-dom";

export const SignupForm = () => {
  const SingUpHandler = () => {
    console.log("signupform");
    
  };

  return (
    <FormLayout
      ButtonTitle="Sign Up"
      onSubmit={SingUpHandler}
      confirmField={true}
      link={{ to: ROUTES.SIGNIN, title: "Sing in" }}
      schema={signUpFormSchema}
    />
  );
};
