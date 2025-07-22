import { authApi } from "@/entites/user/api/auth";
import { SignupForm } from "@/features/auth";
import { FormPageLayout } from "@/shared/ui/layouts/FormPageLayout";
import type { AxiosError } from "axios";

export const Signup = () => {


  return <FormPageLayout title="Sign up" form={<SignupForm />} />;
};
