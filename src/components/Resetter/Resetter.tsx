"use client";

import { locationState } from "@/states/location.states";
import { selectorOptionState } from "@/states/selector.states";
import { FC, useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const Resetter: FC = () => {
  const setLocation = useSetRecoilState(locationState);
  const setOven = useSetRecoilState(selectorOptionState("oven"));
  const setFuel = useSetRecoilState(selectorOptionState("fuel"));

  useEffect(() => {
    setFuel(undefined);
    setOven(undefined);
    setLocation(undefined);
  }, [setFuel, setOven, setLocation]);

  return null;
};
