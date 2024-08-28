import { D1Database } from "@cloudflare/workers-types";
import { authHandler, initAuthConfig } from "@hono/auth-js";
import { Hono } from "hono";
import { handle } from "hono/vercel";

import { getAuthConfig } from "./auth-config";
import users from "./users";

export const runtime = "edge";

// This ensures c.env.DB is correctly typed
type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

// * 初始化 auth 配置
app.use(
  "*",
  initAuthConfig((c) => {
    const config = getAuthConfig(c);
    return config;
  })
);

// * 使用 authHandler 处理 /auth/* 路由, 包括provider验证后的回调等
app.use("/auth/*", authHandler());

// * 使用 authHandler 处理 /protected 路由, 这个可以用来测试 登入后/登入前 的验证机制时候有效
app.use("/protected", async (c, next) => {
  const auth = c.get("authUser");
  if (!auth) {
    return c.text("Unauthorized", 401);
  } else {
    return c.text(JSON.stringify(auth.session.user));
  }
});

app.use("/", async (c) => {
  return c.text("Hello World");
});

const routes = app.route("/users", users).get("/routes", (c: any) => {
  const routes = app.routes;
  console.log("所有路由:");
  routes.forEach((route: { method: string; path: string }) => {
    console.log(`${route.method} ${route.path}`);
  });
  return c.json(
    routes.map((route: { method: string; path: string }) => ({
      method: route.method,
      path: route.path,
    }))
  );
});

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
