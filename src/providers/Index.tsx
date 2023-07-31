import { DeviceProvider } from "./DeviceProvider/DeviceProvider";
import { StateProvider } from "./StateProvider/StateProvider";
import { FC, PropsWithChildren } from "react";

export const AllProviders: FC<PropsWithChildren> = ({ children }) => (
  <StateProvider>
    <DeviceProvider>{children}</DeviceProvider>
  </StateProvider>
);
