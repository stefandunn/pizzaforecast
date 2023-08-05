"use client";

import { WeatherDayConfidence } from "@/states/choice.states";
import { DateTime } from "luxon";
import { FC, useMemo } from "react";
import { ChoiceWeatherDay } from "./ChoiceWeatherDay";
import { WeatherDayData } from "@/app/api/weather/route";

export const Choice: FC<WeatherDayConfidence> = ({ confidence, ...choice }) => {
  const titles = useMemo(() => {
    if (confidence <= 0.1) {
      return {
        h1: "It's not looking good",
        h2: "But if you had to pick a day...",
      };
    }
    if (confidence === 0.5) {
      return {
        h1: "It's a 50-50 shot.",
        h2: "Give it a go, every cook is a learning curve.",
      };
    }
    return {
      h1: "The future is looking bright",
      h2: "It's suggested you cook on this day...",
    };
  }, [confidence]);

  const day = useMemo((): string | undefined => {
    if (!choice.date) {
      return undefined;
    }
    const luxonDate = DateTime.fromISO(choice.date);
    return luxonDate.toFormat("cccc, d LLL");
  }, [choice.date]);

  if (!choice || !choice?.day) {
    return null;
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl">{titles.h1}</h1>
      <h2 className="text-2xl">{titles.h2}</h2>
      <div className="font-display text-4xl text-pink mb-5">{day}</div>
      <ChoiceWeatherDay {...(choice as WeatherDayData)} />
    </div>
  );
};
