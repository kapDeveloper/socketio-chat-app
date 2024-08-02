"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

export default function isAuth(Component) {
  return function IsAuth(props) {
    const token = Cookies.get("token");
    console.log(token);

    useEffect(() => {
      if (!token) {
        redirect("/");
      }
    }, [token]);

    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}
