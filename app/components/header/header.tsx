import React from "react";
import { Button } from "../ui/button";
import { Link } from "@remix-run/react";
import { Search } from "./search";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex justify-between py-6">
      <Search />
      <Link to={"/auth/signup"} className=" px-6">
        <Button>Đăng ký</Button>
      </Link>
      <Link to={"/auth/login"}>
        <Button>Đăng nhập</Button>
      </Link>
    </div>
  );
};

export default Header;
