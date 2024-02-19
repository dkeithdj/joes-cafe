import bcrypt from "bcrypt";
import { prisma } from "@repo/database";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "@admin/lib/authOptions";

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
