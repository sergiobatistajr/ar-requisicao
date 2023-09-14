import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";

const RootAuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/login");
  return <div>{children}</div>;
};

export default RootAuthLayout;
