import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { UpdateUser } from "~/components/user/updateUser";

type Props = {};

export const loader: LoaderFunction = async ({ params }) => {
  const data = await fetch(`${process.env.URL}/user/${params.id}`).then((res) =>
    res.json()
  );
  return data;
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const username = formData.get("username");

  try {
    const response = await fetch(`${process.env.URL}/user/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      // Xử lý lỗi phản hồi không thành công
      throw new Error("Failed to update user");
    }

    const data = await response.json();
    console.log(data);
    return { success: true, ...data };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

const UpdateUserPage = (props: Props) => {
  const data: any = useLoaderData();
  return (
    <>
      <UpdateUser data={data.data} />{" "}
    </>
  );
};

export default UpdateUserPage;
