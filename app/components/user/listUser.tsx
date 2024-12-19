import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Link } from "@remix-run/react";

type Props = {
  data: any;
};

const ListUser = ({ data }: Props) => {
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   if (data) {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 2000);
  //     // setLoading(false);
  //   }
  // }, []);

  return (
    <>
      <Table className="container mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Avata</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            // loading ? (
            //   <p className="text-center">Đang tải dữ liệu</p>
            // ) :
            data ? (
              data.map((user: any, index: number) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user?.avata ? (
                      <img className="w-16" src={user.avata} />
                    ) : null}
                  </TableCell>

                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Link to={`/updateUser/${user._id}`}>
                      <Button>Cập nhật</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p>Không tìm thấy người dùng</p>
            )
          }
        </TableBody>
      </Table>
    </>
  );
};

export default ListUser;
