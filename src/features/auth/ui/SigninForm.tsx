import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const symbolMinEmail = 5;
const symbolMinPassword = 4;
const symbolMaxPassword = 10;
const FormSchema = z.object({
  email: z
    .string()
    .email()
    .min(
      symbolMinEmail,
      `Email must be at least ${symbolMinEmail} characters.`,
    ),
  password: z
    .string()
    .min(
      symbolMinPassword,
      `Password must be at least ${symbolMinPassword} characters.`,
    )
    .max(
      symbolMaxPassword,
      `the password must not be more than ${symbolMaxPassword} characters.`,
    )
    .regex(/[A-Z]/, "The password must contain capital letters.")
    .regex(/[a-z]/, "The password must contain lowercase letters.")
    .regex(/[0-9]/, "The password must contain numbers."),
});

export const SigninForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = () => {
    console.log("Submit");
  };
  return (
    <>
      <label htmlFor="">SigninForm</label>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};
