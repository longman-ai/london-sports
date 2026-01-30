import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          // Optional: Restrict to specific domain
          ...(process.env.ALLOWED_EMAIL_DOMAIN && {
            hd: process.env.ALLOWED_EMAIL_DOMAIN
          })
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow whitelisted admins
      const admin = await prisma.admin.findUnique({
        where: { email: user.email! }
      })
      return !!admin
    },
    async session({ session, user }) {
      // Add admin role to session
      const admin = await prisma.admin.findUnique({
        where: { email: user.email! }
      })
      if (admin) {
        session.user.role = admin.role
        session.user.id = admin.id
      }
      return session
    }
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  }
})
