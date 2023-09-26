import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Login from "@/components/Login";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/admin");

  return (
    <main>
      <Login />
    </main>
  );
}
