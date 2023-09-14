import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/db/prisma";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    role: string;
  }
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      name: string;
      role: string;
    };
  }
}

export const authOptions = {
  callbacks: {
    jwt: ({ user, token }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.role = token.role as string;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const user = await prismadb.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (!user) {
          return null;
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isValid) {
          return null;
        }
        return {
          id: user.id,
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],
} satisfies AuthOptions;

const handlder = NextAuth(authOptions);

export { handlder as GET, handlder as POST };
