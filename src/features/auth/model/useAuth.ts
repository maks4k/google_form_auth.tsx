import type { RouteNames } from "@/shared/types"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ValidationFormfieldsTypes } from "../types";
import type { z } from "zod";
import type { signinFormSchema, signUpFormSchema } from "./formSchema";
import { authApi } from "@/entites/user";
// import * as Cookies from "js-cookie";
import { ROUTES } from "@/shared/router/constants";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";


export const useAuth = (ROUTES_VALUE:`${RouteNames}`) => {
  const navigate = useNavigate();
  const [serverValidationErrors, setServerValidationErrors] =
    useState<ValidationFormfieldsTypes | null>(null);

  const authHandler = async (data: z.infer<typeof signinFormSchema>| z.infer<typeof signUpFormSchema>) => {
    try {
      const resp = await authApi[ROUTES_VALUE](data);
      if (!resp.data.token) {
        throw new Error("Token not found");
      }
      Cookies.set("token", resp.data.token, {
        expires: 1 / 24,
      });
      console.log("nav");
      
      navigate(ROUTES.HOME);
    } catch (err) {
     const error = err as AxiosError<{
        error: string | ValidationFormfieldsTypes;
      }>;
      if (error.response?.data.error instanceof Object) {
        setServerValidationErrors(error.response?.data.error);
      } else {
        toast.error(error.response?.data.error);
      }
    }
  };
  return { authHandler,serverValidationErrors };
    
  
}
