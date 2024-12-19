import { zodResolver } from "@hookform/resolvers/zod";
import { useActionData, useFetcher, useNavigate } from "@remix-run/react";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { action } from "~/routes/auth.signup";

type Props = {};
const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Username không được để trống",
  }),
  email: z.string().min(1, {
    message: "Email không được để trống",
  }),
  password: z.string().min(1, {
    message: "Password không được để trống",
  }),
});

const SignUp: React.FC<Props> = () => {
  const fetcher: any = useFetcher();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    fetcher.submit(formData, { method: "POST" });
  }
  return (
    <>
      <FormProvider {...form}>
        <fetcher.Form
          onSubmit={form.handleSubmit(onSubmit)}
          method="post"
          className="container mx-auto mt-4 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {form.formState.errors.username && (
                  <FormMessage className="text-red-500">
                    {form.formState.errors.username.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  {/* <input type="text" hidden value={"email"} name="email" /> */}
                  <Input {...field} name={"email"} />
                </FormControl>
                {form.formState.errors.email && (
                  <FormMessage className="text-red-500">
                    {form.formState.errors.email.message}
                  </FormMessage>
                )}
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
                  <Input type="password" {...field} />
                </FormControl>
                {form.formState.errors.password && (
                  <FormMessage className="text-red-500">
                    {form.formState.errors.password.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button type="submit">Đăng ký</Button>
            <Button type="button" onClick={() => navigate("/")}>
              Quay lại
            </Button>
          </div>
        </fetcher.Form>
      </FormProvider>
    </>
  );
};

export default SignUp;
