"use client";

import { selector } from "recoil";
import { locationState } from "./location.states";
import { WeatherResponse } from "@/app/api/weather/route";
import { isServer } from "@/utils/helpers";

export type Weather = WeatherResponse | undefined;

export const weatherState = selector<Weather>({
  key: "weather",
  get: async ({ get }) => {
    if (isServer) {
      return;
    }
    const location = get(locationState);
    if (!location) {
      return;
    }
    const { longitude, latitude } = location;

    const response = await fetch(
      `/api/weather?longitude=${longitude}&latitude=${latitude}`
    );
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
    const data = await response.json();
    return data;
  },
});

export const weatherSummaryState = selector<string>({
  key: "weatherDaySummary",
  get: ({ get }) => {
    try {
      const weather = get(weatherState);
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
    } catch {
      return "";
    }
  },
});
