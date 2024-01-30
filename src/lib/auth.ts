import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db"
import NextAuth from "next-auth/next";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        console.log(credentials)

        const userFound = await prisma.user.findUnique({
            where: {
                email: credentials?.email
            }
        })

        if (!userFound) throw new Error('No user found')

        console.log("rep",userFound)

        return {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };