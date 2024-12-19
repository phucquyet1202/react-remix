import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { data, Outlet, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import ListUser from "~/components/user/listUser";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const loader: LoaderFunction = async ({ request }) => {
  const search = new URL(request.url).searchParams;
  const name = search.get("search");
  const data = await fetch(
    name && name != ""
      ? `${process.env.URL}/user/search/${name}`
      : `${process.env.URL}/user`
  ).then((res) => res.json());
  return data;
};
export default function Index() {
  const data: any = useLoaderData();
  return (
    <>
      <ListUser data={data.data} />
    </>
  );
}
