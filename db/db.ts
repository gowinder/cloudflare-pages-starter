// app/db/db.ts
import { D1Database } from "@cloudflare/workers-types";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export const runtime = "edge";

// 全局函数，接受 context 参数，返回 drizzle 实例
export const getDb = () => {
  const db = (process.env as any).DB as D1Database;
  console.log("db: ", db);
  return drizzle(db, { schema });
};
