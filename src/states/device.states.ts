import { atom } from "recoil";

export type Devices = "base" | "mobile" | "tablet" | "desktop";

export const deviceState = atom<Devices>({
  key: "device",
  default: "base",
});
