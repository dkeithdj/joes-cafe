import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "@/lib/authOptions";

interface userProps {
  id: string;
  name: string | null;
  email: string | null;
  hashedPassword: string | null;
  emailVerified: Date | null;
  image: string | null;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
