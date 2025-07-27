import { api } from "@/shared/api/axios-instance";
import type { IUser } from "../types";
import { ROUTES } from "@/shared/api/constants";
import type { AxiosError, AxiosResponse } from "axios";



interface IUserRequest extends Pick<IUser,'email'|'password'>{};
interface IUserResponse{
    id:number;
    email:string;
}
interface IUserSignUPResponse{
        token:string,
        user:IUserResponse
}
interface IUserSingUpResponseError{
    error:string
}

export const authApi={
signin:(data:IUserRequest)=>
api.post<{message:string}>(ROUTES.SIGNIN,data),
signup:(data:IUserRequest)=>{
return api.post<IUserSignUPResponse>(ROUTES.SIGNUP,data)
}
}

