import { api } from "@/shared/api/axios-instance";
import { Button } from "@/shared/ui/button";







export function App() {

api.get("/").then((responce)=>console.log(responce)
  )
  return (<Button size={"lg"} variant="blue">burron</Button>)
}

