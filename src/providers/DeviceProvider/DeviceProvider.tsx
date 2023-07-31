"use client";

import { Devices, deviceState } from "@/states/device.states";
import { FC, PropsWithChildren, useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const DeviceProvider: FC<PropsWithChildren> = ({ children }) => {
  const setState = useSetRecoilState(deviceState);

  const handleResize = useCallback(() => {
    let device: Devices = "base";
    const { innerWidth } = window;
    if (innerWidth > 375) {
      device = "mobile";
    }
    if (innerWidth > 720) {
      device = "tablet";
    }
    if (innerWidth > 1024) {
      device = "desktop";
    }

    setState(device);
  }, [setState]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return children;
};
