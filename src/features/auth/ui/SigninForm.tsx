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
import { ROUTES } from "@/shared/router/constants";
import {signinFormSchema } from "../model/useSignin";
// import { useSignin } from "../model/useSignin";


export const SigninForm = () => {


  const SignInHandler = (data:FormData) => {
    console.log("SingInHandler");
  };

  return (
   <FormLayout ButtonTitle="Sign In"
    onSubmit={SignInHandler}
     link={{to:ROUTES.SIGNUP,title:"Sing up"}
      schema={signinFormSchema}}/>
);
}