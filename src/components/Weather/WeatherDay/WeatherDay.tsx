"use client";

import { WeatherDayData } from "@/app/api/weather/route";
import { FC, useMemo } from "react";
import { DateTime } from "luxon";
import Image from "next/image";
import { BsThermometerHalf, BsWind } from "react-icons/bs";

export const WeatherDay: FC<WeatherDayData> = ({ date, day: data }) => {
  const day = useMemo((): string => {
    const luxonDate = DateTime.fromISO(date);
    return luxonDate.toFormat("cccc, d LLL");
  }, [date]);

  const imageSrc = `https:${data.condition.icon.replace("64x64", "128x128")}`;

  return (
    <li className="weather-day text-center text-sm">
      <span className="block font-semibold">{day}</span>
      <Image
        src={imageSrc}
        width={80}
        height={80}
        alt={data.condition.text}
        className="inline-block"
      />
      <div className="mt-1">{data.condition.text}.</div>
      <div className="flex quick-stats">
        <div className="stat">
          <span>
            <BsWind />
          </span>
          {Math.round(data.maxwind_mph)}mph
        </div>

        <div className="stat">
          <span>
            <BsThermometerHalf />
          </span>
          {Math.round(data.avgtemp_c)}°C
        </div>
      </div>
    </li>
  );
};
