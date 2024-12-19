import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import axios from "axios";
import React from "react";
import SignUp from "~/components/auth/signUp";
import { handleSuccess } from "~/utils/message";

type Props = {};
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const datatocreate: any = {
    email,
    username,
    password,
  };
  return await axios
    .post(`${process.env.URL}/user/signup`, datatocreate)
    .then(() => redirect("/auth/login"))
    .catch((err) => err.message);
};
const SignUpPage = (props: Props) => {
  return (
    <>
      <SignUp />
    </>
  );
};

export default SignUpPage;
