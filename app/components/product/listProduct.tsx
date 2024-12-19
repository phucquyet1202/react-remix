import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

type Props = {};

const ListProduct = (props: Props) => {
  const data: any = useLoaderData();
  return (
    <>
      <Link to="/createProduct">
        <Button className="m-5 bg-blue-400">Thêm mới</Button>
      </Link>
      <Table className="container mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Quantity</TableHead>

            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            //   loading ? (
            //     <p className="text-center">Đang tải dữ liệu</p>
            //   ) :
            data.data.map((product: any, index: number) => (
              <TableRow key={product._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  {product.images.map((img: any) => (
                    <img className="w-20 h-20" src={img.url} />
                  ))}
                </TableCell>

                <TableCell>{product.quantity}</TableCell>

                <TableCell>
                  <Link to={`/updateProduct/${product._id}`}>
                    <Button>Cập nhật</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </>
  );
};

export default ListProduct;
