
import { authApi } from "@/entites/user/api/auth";
import { Button } from "@/shared/ui/button";

export function App() {
  // api.get("/").then((responce)=>console.log(responce)
  //   )
 authApi.signin({ email: "test@test.ru", password: "123" }).then(resp=>console.log(resp.data)
 )
  return (
    <Button size={"lg"} variant="blue">
      burron
    </Button>
  );
}
