import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import styles from "./tailwind.css?url";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import Aside from "./components/aside/aside";
import Header from "./components/header/header";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SidebarProvider>
          {" "}
          <Aside /> <SidebarTrigger />
          <main className="w-3/4 mx-auto">
            <Header />
            {children}{" "}
          </main>{" "}
        </SidebarProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
