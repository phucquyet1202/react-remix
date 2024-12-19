import { json, LoaderFunction } from "@remix-run/node";
import React from "react";
import ListProduct from "~/components/product/listProduct";

type Props = {};
export const loader: LoaderFunction = async () => {
  const data = await fetch(`${process.env.URL}/product`).then((res) =>
    res.json()
  );
  return json(data, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache 1 giờ
    },
  });
};
const ProductPage = (props: Props) => {
  return (
    <>
      <ListProduct />
    </>
  );
};

export default ProductPage;
