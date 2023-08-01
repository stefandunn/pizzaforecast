"use client";

import { weatherDayChoiceState } from "@/states/choice.states";
import { FC } from "react";
import { useRecoilValueLoadable } from "recoil";

export const WeatherChoice: FC = () => {
  const { state, contents: choice } = useRecoilValueLoadable(
    weatherDayChoiceState
  );

  if (state === "hasValue") {
    console.log({ choice });
  }

  return null;
};
