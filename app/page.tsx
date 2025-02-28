"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const user = useUser();
  if (user) {
    return redirect("/dashboard");
  }
  return <SignIn />;
}
