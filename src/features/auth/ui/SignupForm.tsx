
import { FormLayout } from "./layouts/FormLayout";
import { ROUTES } from "@/shared/router/constants";
import { signUpFormSchema } from "../model/formSchema";
import { useSignup } from "../model/useSignup";


export const SignupForm = () => {
const {SingUpHandler}=useSignup();

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
