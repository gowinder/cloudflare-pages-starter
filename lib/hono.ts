import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
console.log(
  "process.env.NEXT_PUBLIC_APP_URL:",
  process.env.NEXT_PUBLIC_APP_URL
);
export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
