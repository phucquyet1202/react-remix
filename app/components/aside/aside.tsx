import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import { Link } from "@remix-run/react";

type Props = {};

const Aside = (props: Props) => {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <Link to={"/"}>Quản lý User</Link>
        </SidebarGroup>
        <SidebarGroup>
          <Link to={"/product"}>Quản lý Product</Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default Aside;
