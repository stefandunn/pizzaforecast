import { atom } from "recoil";

export const locationState = atom<
  Pick<GeolocationCoordinates, "longitude" | "latitude"> | undefined
>({
  key: "location",
  default: undefined,
});
