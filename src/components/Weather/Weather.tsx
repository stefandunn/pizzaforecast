"use client";

import { WeatherResponse } from "@/app/api/weather/route";
import { globalState } from "@/utils/state";
import clsx from "clsx";
import { FC, useEffect, useMemo, useState } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { WeatherDay } from "./WeatherDay/WeatherDay";

export const Weather: FC<{ className?: string }> = ({ className }) => {
  const [weather, setWeather] = useState<WeatherResponse>();
  const [weatherError, setWeatherError] = useState<string>("");
  const coordinates = globalState.get<GeolocationCoordinates>("position");

  const { latitude, longitude }: { latitude?: number; longitude?: number } =
    useMemo(() => {
      if (!coordinates) {
        return { latitude: undefined, longitude: undefined };
      }

      return coordinates;
    }, [coordinates]);

  useEffect(() => {
    if (!longitude || !latitude) {
      return;
    }
    setWeatherError("");
    fetch(`/api/weather?longitude=${longitude}&latitude=${latitude}`)
      .then(async (response) => {
        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error);
        }
        return response.json();
      })
      .then((data: WeatherResponse) => {
        setWeather(data);
      })
      .catch((e: Error) => {
        setWeather(undefined);
        setWeatherError(e.message);
      });
  }, [latitude, longitude]);

  const weatherSummary = useMemo((): string => {
    if (!weather) {
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

    return "The upcoming weather is not looking great.";
  }, [weather]);

  const weatherBlockStyleClass =
    "h-[200px] bg-indigo rounded-xl p-3 text-white";

  if (typeof weather === "undefined") {
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

  if (weatherError) {
    return (
      <div
        className={clsx("alert flex items-center justify-center", className)}
      >
        {weatherError}
      </div>
    );
  }

  return (
    <div className={clsx(weatherBlockStyleClass, className, "weather")}>
      <h3 className="text-lg text-center mb-3">{weatherSummary}</h3>
      <ul className="flex flex-col sm:flex-row items-stretch gap-5">
        {weather.forecast.forecastday.slice(1).map((dayData, index) => (
          <WeatherDay {...dayData} key={index} />
        ))}
      </ul>
    </div>
  );
};
