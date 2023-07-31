import { atomFamily } from "recoil";

export type SelectorTypes = "oven" | "fuel";

export const selectorOptionState = atomFamily<
  string | undefined,
  SelectorTypes
>({
  key: "selectorOption",
  default: undefined,
});
