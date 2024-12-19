import { ActionFunction } from "@remix-run/node";
import axios from "axios";
import React from "react";
import { CreateProduct } from "~/components/product/createProduct";

type Props = {};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // Tạo FormData để gửi
  const data = new FormData();
  data.append("name", formData.get("name") as string);
  data.append("description", formData.get("description") as string);
  data.append("price", formData.get("price") as string);
  data.append("quantity", formData.get("quantity") as string);
  // Nếu bạn có file, bạn cần append nó dưới dạng blob/file
  data.append("images", formData.get("images") as File);
  console.log(data);
  // Gửi FormData thông qua axios
  //   const response = await axios.post(`${process.env.URL}/product`, data, {
  //     headers: {
  //       "Content-Type": "multipart/form-data", // Rất quan trọng để axios biết kiểu dữ liệu
  //     },
  //   });

  return 1; // Trả về dữ liệu nhận được từ server
};

const CreateProductPage = (props: Props) => {
  return (
    <>
      <CreateProduct />
    </>
  );
};

export default CreateProductPage;
