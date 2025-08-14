import { Signin } from "@/pages/signin";
import { Signup } from "@/pages/signup";
import { Home } from "@/pages/home";
import { AppLayout } from "./AppLayout";
import { ROUTES } from "@/shared/router/constants";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { authApi } from "@/entites/user";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
        loader: async () => {
          try {
            const resp =await authApi.protected();
            console.log(resp.data.user.email);
            
          } catch (error) {
  
            
            throw redirect(ROUTES.SIGNIN);
          }
        },
      },
    ],
  },
  {
    path: ROUTES.SIGNIN,
    element: <Signin />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
  },
]);
export const AppRouter = () => <RouterProvider router={router} />;
