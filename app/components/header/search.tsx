import { FormProvider, useForm } from "react-hook-form";
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
import { Form, useFetcher, useLocation, useNavigate } from "@remix-run/react";
import { useEffect } from "react";

type Prop = {};

export function Search() {
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      search: "",
    },
  });
  const onSubmit = (formData: any) => {
    if (location.pathname === "/") {
      navigate(`/?search=${formData.search}`);
      form.reset();
    } else {
      navigate(`/product?search=${formData.search}`);
      form.reset();
    }
  };

  return (
    <FormProvider {...form}>
      <fetcher.Form
        onSubmit={form.handleSubmit(onSubmit)}
        method="GET"
        className="container mx-auto mt-4 space-y-6"
      >
        <div className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} className="w-full" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Tìm kiếm</Button>
        </div>
      </fetcher.Form>
    </FormProvider>
  );
}
