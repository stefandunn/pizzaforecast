import { selector } from "recoil";
import { weatherState } from "./weather.states";
import { selectorOptionState } from "./selector.states";
import { WeatherDayData } from "@/app/api/weather/route";
import { isServer } from "@/utils/helpers";

export interface WeatherDayConfidence extends Partial<WeatherDayData> {
  confidence: number;
}

export const weatherDayChoiceState = selector<WeatherDayConfidence | undefined>(
  {
    key: "weatherDayChoice",
    get: ({ get }) => {
      const weather = get(weatherState);
      const oven = get(selectorOptionState("oven"));
      const fuel = get(selectorOptionState("fuel"));

      if (
        !weather ||
        !oven ||
        !fuel ||
        isServer ||
        weather.forecast.forecastday.length === 0
      ) {
        return;
      }

      const daysWithoutCondition = (keywords: string[]) => {
        const days = weather.forecast.forecastday;
        return days.filter((day) => {
          const condition = day.day.condition.text.toLowerCase();
          return (
            keywords.filter((keyword) => condition.includes(keyword)).length ===
            0
          );
        });
      };

      const daysWithinTemperature = ({
        minTemp,
        maxTemp,
      }: {
        minTemp?: number;
        maxTemp?: number;
      }) => {
        const days = weather.forecast.forecastday;
        return days.filter((day) => {
          const avgTemp = day.day.avgtemp_c;
          let matchesTmp = true;
          if (minTemp && avgTemp < minTemp) {
            matchesTmp = false;
          }
          if (maxTemp && avgTemp > maxTemp) {
            matchesTmp = false;
          }

          return matchesTmp;
        });
      };

      const mutatableForecast = [...weather.forecast.forecastday];
      const ovenType = oven.replace(/\s\d+/g, "").toLowerCase();

      if (ovenType === "volt") {
        return { ...mutatableForecast.shift(), confidence: 1 };
      }
      // Ideally we want non-windy days, no rain
      if (ovenType === "karu" || ovenType === "fyra") {
        const goodDays = daysWithoutCondition([
          "rain",
          "shower",
          "hail",
          "sleet",
          "snow",
          "drizzle",
          "wind",
          "gust",
          "breez",
        ]);
        const warmDays = daysWithinTemperature({ minTemp: 15 });
        if (goodDays.length) {
          return { ...goodDays[0], confidence: 1 };
        }
        if (warmDays.length) {
          return { ...warmDays[0], confidence: 0.5 };
        }
      }

      // Ideally we want non-windy days
      if (ovenType === "koda") {
        const goodDays = daysWithoutCondition(["wind", "gust", "breez"]);
        const warmDays = daysWithinTemperature({ minTemp: 10 });
        if (goodDays.length) {
          return { ...goodDays[0], confidence: 1 };
        }
        if (warmDays.length) {
          return { ...warmDays[0], confidence: 0.5 };
        }
      }

      return { ...mutatableForecast.shift(), confidence: 0.1 };
    },
  }
);
