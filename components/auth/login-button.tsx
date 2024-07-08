"use client";

import { useRouter } from "next/navigation";
import { Children } from "react";

interface LoginButonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButonProps) => {
    const router=useRouter();
    const onClick=()=>{
        console.log("Hi");
        router.push("auth/login")
        
    }
    return(
        <span onClick={onClick} className="cursor-pointer">{children}</span>
    )
};
