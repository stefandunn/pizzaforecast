import { headers } from "next/headers";
import { getOrElse } from "./helpers";

export const pathname = (): string =>
  getOrElse<string>(() => new URL(headers().get("x-url") as string).pathname) ||
  "/";
