"use client";

import clsx from "clsx";
import { FC, useMemo } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { WeatherDay } from "./WeatherDay/WeatherDay";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { locationState } from "@/states/location.states";
import { weatherState } from "@/states/weather.states";

export const Weather: FC<{ className?: string }> = ({ className }) => {
  const { state, contents: weather } = useRecoilValueLoadable(weatherState);
  const coordinates = useRecoilValue(locationState);

  const { latitude, longitude }: { latitude?: number; longitude?: number } =
    useMemo(() => {
      if (!coordinates) {
        return { latitude: undefined, longitude: undefined };
      }

      return coordinates;
    }, [coordinates]);

  const weatherSummary = useMemo((): string => {
    if (state !== "hasValue") {
      return "";
    }
    const conditions = weather.forecast.forecastday.map(
      (day) => day.day.condition.text
    );
    const sunnyDays = conditions.filter((condition) =>
      condition.toLocaleLowerCase().includes("sunny")
    );
    const fairDays = conditions.filter(
      (condition) =>
        condition.toLocaleLowerCase().includes("cloudy") ||
        condition.toLocaleLowerCase().includes("overcast")
    );

    const rainyDays = conditions.filter(
      (condition) =>
        condition.toLocaleLowerCase().includes("rain") ||
        condition.toLocaleLowerCase().includes("shower")
    );

    if (sunnyDays.length === 3) {
      return "The next few days look great! Perfect for making pizza.";
    }
    if (sunnyDays.length > 1) {
      return "There are some good days this week for making pizza.";
    }

    if (fairDays.length === 3) {
      return "The next few days look fair, depending on the wind, it good be good for cooking pizza.";
    }
    if (fairDays.length > 1) {
      return "There is one or two fair days, depending on the wind, it good be good for cooking pizza.";
    }

    if (rainyDays.length > 1) {
      return "The upcoming weather is not looking great, making pizza will be a little harder... unless you have a Volt!";
    }

    return "The upcoming weather is not looing the best, but there's still a chance to make pizza.";
  }, [state, weather]);

  const weatherBlockStyleClass =
    "h-[200px] bg-indigo rounded-xl p-3 text-white";

  if (state === "hasError") {
    return (
      <div
        className={clsx("alert flex items-center justify-center", className)}
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
        {weather.forecast.forecastday.slice(1).map((dayData, index) => (
          <WeatherDay {...dayData} key={index} />
        ))}
      </ul>
    </div>
  );
};
