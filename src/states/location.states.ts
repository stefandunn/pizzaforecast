"use client";

import { atom } from "recoil";
import { localStorageState } from "./localStorageState";

type Location =
  | Pick<GeolocationCoordinates, "longitude" | "latitude">
  | undefined;

export const locationState = atom<Location>({
  key: "location",
  default: localStorageState.get<Location>("location"),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (typeof newValue !== "undefined") {
          localStorageState.set("location", newValue);
        } else {
          localStorageState.remove("location");
        }
      });
    },
  ],
});
