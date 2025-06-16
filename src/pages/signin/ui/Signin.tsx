import { authApi } from "@/entites/user/api/auth";
// import { Button } from "@/shared/ui/button";
import { AxiosError } from "axios";



export const Signin = () => {
  authApi
    .signin({ email: "admin@mail.ru", password: "1234" })
    .then((resp) => {
      console.log(resp.data.message);
    })
    .catch((error: AxiosError<{ error: string }>) => {
      console.log(error.response?.data.error);
    });
  return (
    <h1>Signin page</h1>
    // <Button size={"lg"} variant="blue">
    //   burron
    // </Button>
  )
}
