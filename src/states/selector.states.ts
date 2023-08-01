"use client";

import { atomFamily } from "recoil";
import { localStorageState } from "./localStorageState";

export type SelectorTypes = "oven" | "fuel";

export const selectorOptionState = atomFamily<
  string | undefined,
  SelectorTypes
>({
  key: "selectorOption",
  default: (param) =>
    localStorageState.get<string | undefined>(`option-${param}`),
  effects: (param) => [
    ({ onSet }) => {
      onSet((newValue) => {
        if (typeof newValue !== "undefined") {
          localStorageState.set(`option-${param}`, newValue);
        } else {
          localStorageState.remove(`option-${param}`);
        }
      });
    },
  ],
});
