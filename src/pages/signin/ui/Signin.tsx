
import { SigninForm, withCheckAuth } from "@/features/auth";
import { FormPageLayout } from "@/shared/ui/layouts/FormPageLayout";


export const Signin = withCheckAuth(() => {
  return <FormPageLayout title="Sign in" form={<SigninForm />} />;
});
