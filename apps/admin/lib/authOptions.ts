import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { prisma } from "@repo/database";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials, req) {
        const { email, password }: any = credentials;

        if (!email || !password) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        // console.log(user?.hashedPassword);
        if (!user) return null;
        const hashedPassword = user?.hashedPassword;
        // if (hashedPassword) {
        //   return passwordMatch;
        // }
        const passwordMatch =
          hashedPassword && bcrypt.compare(password, hashedPassword);
        // const passwordMatch = bcrypt.compare(password, hashedPassword);

        if (!passwordMatch) return null;
        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
