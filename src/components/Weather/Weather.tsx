"use client";

import clsx from "clsx";
import { FC } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { WeatherDay } from "./WeatherDay/WeatherDay";
import { useRecoilValueLoadable } from "recoil";
import { weatherState, weatherSummaryState } from "@/states/weather.states";

export const Weather: FC<{ className?: string }> = ({ className }) => {
  const { state, contents: weather } = useRecoilValueLoadable(weatherState);
  const { contents: weatherSummary } =
    useRecoilValueLoadable(weatherSummaryState);

  const weatherBlockStyleClass =
    "h-[200px] bg-indigo rounded-xl p-3 text-white";

  if (state === "hasError") {
    return (
      <div
        className={clsx("alert flex items-center justify-center", className)}
        suppressHydrationWarning
      >
        {(weather as Error).message}
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div
        className={clsx(
          "animate-pulse flex items-center justify-center",
          weatherBlockStyleClass,
          className
        )}
      >
        <span className="text-center">
          <span className="block mb-3">Loading weather</span>
          <CgSpinnerTwoAlt className="inline text-xl animate-spin" />
        </span>
      </div>
    );
  }

  return (
    <div className={clsx(weatherBlockStyleClass, className, "weather")}>
      <h3 className="text-lg text-center mb-3">{weatherSummary}</h3>
      <ul className="flex flex-row flex-nowrap overflow-auto sm:overflow-hidden items-stretch gap-5">
        {weather?.forecast.forecastday.slice(1).map((dayData, index) => (
          <WeatherDay {...dayData} key={index} />
        ))}
      </ul>
    </div>
  );
};
