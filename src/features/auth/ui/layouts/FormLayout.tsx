import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import type { signinFormSchema, signUpFormSchema } from "../../model/formSchema";
import { Toaster } from "sonner";



interface FormLayoutProps {
  ButtonTitle: string;
  onSubmit: (data:z.infer<typeof signinFormSchema>|z.infer<typeof signUpFormSchema>) =>Promise< void>;
  confirmField?: boolean;
  link: {
    to: string;
    title: string;
  };
  schema:typeof signinFormSchema|typeof signUpFormSchema;
}



export const FormLayout = ({
  ButtonTitle,
  onSubmit,
  confirmField,
  link,
  schema,
}: FormLayoutProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues:{
      email:"",
      password:"",
    ...(confirmField?{confirmPassword:""}:{}),
    },
  });
  const {
    watch,
    formState: { errors },
  } = form;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isPasswordValid = !errors.password && watch("password");

  return (
    <div>
      <Form {...form}>
         <Toaster />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="text-zinc-500 group-focus-within:text-zinc-50">
                  Login
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Email"
                      {...field}
                      className="border-zinc-500 focus:border-zink-50 text-zinc-50 pl-9"
                    />
                    <span className="w-5 h-4 bg-[url(https://api.iconify.design/ic:outline-mail.svg?color=%23626060)] bg-no-repeat bg-cover absolute top-2/7 left-2 group-focus-within:bg-[url(https://api.iconify.design/ic:outline-mail.svg?color=%23ffffff)]"></span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="group">
                <FormLabel className="text-zinc-500 group-focus-within:text-zinc-50 ">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="border-zinc-500 focus:border-zinс-50 text-zinc-50 pl-9"
                      type={showPassword ? "password" : "text"} // Переключаем тип поля ввода
                      placeholder="Password"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() =>
                       setShowPassword(!showPassword)
                      } // Переключаем видимость пароля
                    >
                      {showPassword ? (
                        <EyeOff className="h-3 w-3 text-gray-500" /> // Иконка "глаз закрыт"
                      ) : (
                        <Eye className="h-3 w-3 text-gray-500" /> // Иконка "глаз открыт"
                      )}
                    </button>
                    <span className="w-5 h-5 bg-[url(https://api.iconify.design/hugeicons:square-lock-password.svg?color=%23626060)] bg-no-repeat bg-cover absolute top-2/7 left-2 group-focus-within:bg-[url(https://api.iconify.design/hugeicons:square-lock-password.svg?color=%23ffffff)]"></span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {confirmField && isPasswordValid && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="group">
                  <FormLabel className="text-zinc-500 group-focus-within:text-zinc-50 ">
                    Confirm password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="border-zinc-500 focus:border-zinс-50 text-zinc-50 pl-9"
                        type={showConfirmPassword ? "password" : "text"} // Переключаем тип поля ввода
                        placeholder="Confirm password"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Переключаем видимость пароля
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-3 w-3 text-gray-500" /> // Иконка "глаз закрыт"
                        ) : (
                          <Eye className="h-3 w-3 text-gray-500" /> // Иконка "глаз открыт"
                        )}
                      </button>
                      <span className="w-5 h-5 bg-[url(https://api.iconify.design/hugeicons:square-lock-password.svg?color=%23626060)] bg-no-repeat bg-cover absolute top-2/7 left-2 group-focus-within:bg-[url(https://api.iconify.design/hugeicons:square-lock-password.svg?color=%23ffffff)]"></span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            className="w-full bg-[#2859FE] py-6 cursor-pointer hover:bg-[#1642d3]"
            type="submit"
          >
            {ButtonTitle}
          </Button>
        </form>
        <Button variant={"link"}  className="text-blue-600 mx-auto block">
          <Link to={link.to}>{link.title}</Link>
        </Button>
      </Form>
    </div>
  );
};
