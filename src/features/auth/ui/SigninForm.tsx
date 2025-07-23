
import { FormLayout } from "./layouts/FormLayout";
import { ROUTES } from "@/shared/router/constants";
import { signinFormSchema } from "../model/formSchema";
import { useSignin } from "../model/useSignin";
// import { useSignin } from "../model/useSignin";


export const SigninForm = () => {
const {SignInHandler}=useSignin();



  return (
   <FormLayout ButtonTitle="Sign In"
    onSubmit={SignInHandler}
     link={{to:ROUTES.SIGNUP,title:"Sing up"}}
      schema={signinFormSchema}/>
);
}