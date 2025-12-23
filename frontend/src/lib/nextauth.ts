import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


type TokenWithExtras = {
  accessToken?: string;
  idToken?: string;
};
type UserWithToken = {
  token?: string;
};

const providers: AuthOptions["providers"] = [
  CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          if (res.ok && data.token) {
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              token: data.token,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
  }),
];



if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const authOptions: AuthOptions = {
  providers,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const t = token as typeof token & TokenWithExtras;

            if (user) {

              const u = user as typeof user & UserWithToken;

              if (u.token) t.accessToken = u.token;

            }

      

            // When signing in with Google, persist the Google ID token so we can send it to the backend.

            if (account?.provider === "google" && account.id_token) {

              t.idToken = account.id_token;

            }

      

            return t;
    },
    async session({ session, token }) {
      console.log("Session callback triggered. Token:", token);  // Debug: Check token data
      console.log("Session before update:", session);  // Debug: Check initial session

      // Explicitly set session.user from the token for consistency across providers
      session.user = {
        id: token.sub as string,  // Unique user ID
        name: token.name as string,
        email: token.email as string,
      };

      console.log("Session after update:", session);  // Debug: Check updated session

      // Keep existing accessToken and idToken
      const t = token as typeof token & TokenWithExtras;
      session.accessToken = t.accessToken;
      session.idToken = t.idToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",
};

export default NextAuth(authOptions);
