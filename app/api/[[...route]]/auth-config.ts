import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthConfig } from "@hono/auth-js";
import { Context } from "hono";

import { getDb } from "@/db/db";

export function getAuthConfig(c: Context): AuthConfig {
  return {
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    debug: true,
    secret: process.env.AUTH_SECRET,
    providers: [
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        const newSession = session as any;
        newSession["token"] = token;
        return session;
      },
      async jwt({ token, user, account, profile, session }) {
        return token;
      },
    },
    adapter: {
      ...DrizzleAdapter(getDb(c)),
    },
  };
}
