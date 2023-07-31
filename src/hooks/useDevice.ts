import { Devices, deviceState } from "@/states/device.states";
import { useRecoilValue } from "recoil";

export const useDevice = (): Devices => useRecoilValue(deviceState);
