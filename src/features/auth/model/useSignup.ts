
import type { AxiosError } from "axios";
import type { signUpFormSchema } from "./formSchema";
import type { z } from "zod";
import { authApi } from "@/entites/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/router/constants";
import { toast } from "sonner";




export const useSignup = () => {
  const navigate=useNavigate()
    const SingUpHandler = async(data: z.infer< typeof signUpFormSchema>) => {
      try {
        throw new Error();
        
        await  authApi
     .signup(data)
     navigate(ROUTES.HOME)
      } catch (error) {
      toast.error("Event has been created.")
      }
//  authApi
//     .signup({ email: "admin@mail.ru", password: "1234" })
//     .then((resp) => console.log(resp.data.message))
//     .catch((error: AxiosError<{ error: string }>) => {
//       console.log(error.response?.data.error);
//     });
        console.log("signuphandler");
  };
 return {SingUpHandler}
};
