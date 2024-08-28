import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { Bindings } from "hono/types";

import { getDb } from "@/db/db";
import { accounts } from "@/db/schema";

const app = new Hono<{ Bindings: Bindings }>().get("/:userId", async (c) => {
  const userId = c.req.param("userId");
  const db = getDb(c);
  const userAccount = await db.query.accounts.findFirst({
    where: eq(accounts.userId, userId),
    columns: {
      provider: true,
      providerAccountId: true,
      id_token: true,
    },
  });

  if (!userAccount) {
    throw new HTTPException(404, { message: "user not found" });
  }

  return c.json({
    ...userAccount,
  });
});

export default app;
