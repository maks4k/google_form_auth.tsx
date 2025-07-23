import type { AxiosError } from "axios";
import { signinFormSchema } from "./formSchema";
import type { z } from "zod";
import { authApi } from "@/entites/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/router/constants";
import { toast } from "sonner";

export const useSignin = () => {
 const navigate=useNavigate()
  const SignInHandler = async (data: z.infer<typeof signinFormSchema>) => {

  try {
    throw new Error()
    await  authApi.signin(data);
    navigate(ROUTES.HOME)
     console.log("signinhandler");
  } catch (error) {
  toast.error("Event has been created.")
  }







    // authApi
    //   .signin({ email: "admin@mail.ru", password: "1234" })
    //   .then((resp) => console.log(resp.data.message))
    //   .catch((error: AxiosError<{ error: string }>) => {
    //     console.log(error.response?.data.error);
    //   });
   
  };
  return { SignInHandler };
};
