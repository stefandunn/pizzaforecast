"use client";

import {
  WeatherDayConfidence,
  weatherDayChoiceState,
} from "@/states/choice.states";
import { FC, useMemo } from "react";
import { useRecoilValueLoadable } from "recoil";
import { Guage } from "../Guage/Guage";
import { Choice } from "../Choice/Choice";

export const WeatherChoice: FC = () => {
  const { state, contents } = useRecoilValueLoadable(weatherDayChoiceState);

  const choiceData = useMemo(() => {
    if (!contents) {
      return undefined;
    }
    return contents as WeatherDayConfidence;
  }, [contents]);

  if (state === "loading") {
    return <div className="bg-[#333] animate-pulse rounded-xl h-200" />;
  }

  if (!choiceData || state === "hasError") {
    return (
      <div
        className="alert flex items-center justify-center"
        suppressHydrationWarning
      >
        <p>Just couldn&apos;t decide.</p>
      </div>
    );
  }

  return (
    <div id="weather-choice">
      <div className="flex flex-col md:flex-row flex-nowrap items-center gap-5 mb-5">
        <div>
          <Guage confidence={choiceData.confidence} />
        </div>
        <div>
          <Choice {...choiceData} />
        </div>
      </div>
    </div>
  );
};
