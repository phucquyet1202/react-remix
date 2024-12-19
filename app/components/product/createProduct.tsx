import React, { useState } from "react";
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

type Prop = {};

const imageSchema = z.object({
  uri: z.string().url("URI must be a valid URL"),
  url: z.string().url("URL must be a valid URL"),
});

// const FormSchema = z.object({
//   name: z.string().min(1, {
//     message: "Username must be at least 1 characters.",
//   }),
//   price: z.number().positive({
//     message: "Price must be a positive number.",
//   }),
//   quantity: z.number().positive({
//     message: "Quantity must be a positive number.",
//   }),
//   description: z.string().min(1, {
//     message: "Description must be at least 1 characters.",
//   }),
//   images: z.array(imageSchema).nonempty("At least one image is required"),
// });

export function CreateProduct() {
  const fetcher: any = useFetcher();
  console.log(fetcher?.data);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    // resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      description: "",
      images: [],
    },
  });

  const [fileInputs, setFileInputs] = useState([{ id: 1 }]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (id: number, file: File) => {
    setFileInputs((prevInputs) => {
      const newInputs = prevInputs.map((input) =>
        input.id === id ? { ...input, hasFile: true } : input
      );

      if (newInputs.every((input: any) => input.hasFile)) {
        newInputs.push({ id: newInputs.length + 1, hasFile: false });
      }

      return newInputs;
    });

    setFiles((prevFiles) => [...prevFiles, file]);
  };

  function onSubmit(formData: any) {
    // Chuyển đổi các giá trị số từ chuỗi sang số
    const validatedData = {
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      images: files.map((file) => ({
        file,
      })),
    };

    console.log(validatedData);
    fetcher.submit(validatedData, { method: "post" });
  }

  return (
    <FormProvider {...form}>
      <fetcher.Form
        // onSubmit={form.handleSubmit(onSubmit)}
        method="post"
        encType="multipart/form-data"
        className="container mx-auto mt-4 space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {form.formState.errors.name && (
                <FormMessage className="text-red-500">
                  {form.formState.errors.name.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              {form.formState.errors.price && (
                <FormMessage className="text-red-500">
                  {form.formState.errors.price.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              {form.formState.errors.quantity && (
                <FormMessage className="text-red-500">
                  {form.formState.errors.quantity.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {form.formState.errors.description && (
                <FormMessage className="text-red-500">
                  {form.formState.errors.description.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <div className="grid w-full max-w-sm items-center gap-1.5">
          {/* {fileInputs.map((input) => ( */}
          <div className="mb-2">
            <FormField
              control={form.control}
              name={`images`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      id={`picture-1`}
                      type="file"
                      onChange={(e: any) => {
                        handleFileChange(1, e.target.files[0]);
                      }}
                    />
                  </FormControl>
                  {form.formState.errors.images && (
                    <FormMessage className="text-red-500">
                      {form.formState.errors.images.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          {/* ))} */}
        </div>

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
