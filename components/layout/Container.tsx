"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Route } from "../../lib/utils/routes";

export function Container({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const title = Object.values(Route).find(
    (route) => route.path === pathname
  ).title;
  return (
    <div className="w-full sm:w-3/4 m-auto bg-primary-400">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
