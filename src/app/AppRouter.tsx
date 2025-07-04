import { Signin } from "@/pages/signin";
import { Signup } from "@/pages/signup";
import { Home } from "@/pages/home";
import { AppLayout } from "./AppLayout";
import { ROUTES } from "@/shared/router/constants";
import { createBrowserRouter, RouterProvider} from "react-router-dom";


const router=createBrowserRouter([
{
path:ROUTES.HOME,
element:<AppLayout/>,
children:[{
    path:ROUTES.HOME,
    element:<Home/>
}]
},
{
path:ROUTES.SIGNIN,
element:<Signin/>
},
{
path:ROUTES.SIGNUP,
element:<Signup/>
}
])
export const AppRouter = () => <RouterProvider router={router} />;