import { ActionFunction, json, redirect } from "@remix-run/node";
import React from "react";
import LogIn from "~/components/auth/logIn";
import axios from "axios";

type Props = {};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("email");
  const password = formData.get("password");
  const dataLogin: any = { username, password };

  try {
    const response = await axios.post(
      `${process.env.URL}/user/login`,
      dataLogin
    );
    // console.log(response.data);
    return redirect("/");
  } catch (err: any) {
    // console.log(err.message);
    return json({ error: err.message }, { status: 400 });
  }
};

const LogInPage = (props: Props) => {
  return (
    <>
      <LogIn />
    </>
  );
};

export default LogInPage;
