import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "~/hooks/use-toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Form, useFetcher, useNavigate } from "@remix-run/react";
import { useEffect } from "react";

type Prop = {
  data: any;
};

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function UpdateUser({ data }: Prop) {
  const fetcher: any = useFetcher();
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: data.username,
    },
  });

  useEffect(() => {
    if (fetcher.data?.success) {
      toast({
        title: "Update successful",
        description: "User information has been updated successfully.",
        duration: 3000,
      });
      navigate("/"); // Redirect after successful update
    } else if (fetcher.data?.error) {
      toast({
        title: "Update failed",
        description: fetcher.data.error,
      });
    }
  }, [fetcher.data, toast, navigate]);

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    fetcher.submit(formData, { method: "post" });
  }

  return (
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
        <div className="flex justify-between">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={() => navigate("/")}>
            Quay lại
          </Button>
        </div>
      </fetcher.Form>
    </FormProvider>
  );
}
