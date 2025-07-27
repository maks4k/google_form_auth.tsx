import { AxiosError } from "axios";
import type { signUpFormSchema } from "./formSchema";
import type { z } from "zod";
import { authApi } from "@/entites/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/router/constants";
import { toast } from "sonner";
import * as Cookies from "js-cookie";


export const useSignup = () => {
  const navigate = useNavigate();
  const SingUpHandler = async (data: z.infer<typeof signUpFormSchema>) => {
    try {
      // throw new Error();

      const resp = await authApi.signup(data);
      if (!resp.data.token) {
        throw new Error("Token not found")
      }
     Cookies.default.set("token",resp.data.token,{
      expires:1/24,
     })
   

      navigate(ROUTES.HOME);
    } catch (error) {
      if (error instanceof AxiosError) {
        // error as AxiosError<{error:string}>
        const errorsArray = Object.entries(error.response?.data);
        const errorMesage = errorsArray.map((err) => `${err[0]}:${err[1]}`);
        toast.error(errorMesage);
      }
    }

    //  authApi
    //     .signup({ email: "admin@mail.ru", password: "1234" })
    //     .then((resp) => console.log(resp.data.message))
    //     .catch((error: AxiosError<{ error: string }>) => {
    //       console.log(error.response?.data.error);
    //     });
  };
  return { SingUpHandler };
};
