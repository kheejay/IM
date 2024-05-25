import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'KindeAuth',
      credentials: {},
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.id === credentials.id) {
          return Promise.resolve(user); // Return user object
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.role = user.role; // Attach user role to the JWT token
      }
      return token;
    },
    async session(session, token) {
      session.user.role = token.role; // Attach user role to the session
      return session;
    },
  },
callbacks: {
    async jwt(token, user) {
      if (user) {
        token.role = user.role; // Attach user role to the JWT token
      }
      return token;
    },
    async session(session, token) {
      session.user.role = token.role; // Attach user role to the session
      return session;
    },
  },
});