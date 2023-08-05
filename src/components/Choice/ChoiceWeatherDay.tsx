import { WeatherDayData } from "@/app/api/weather/route";
import Image from "next/image";
import { FC } from "react";
import { BsThermometerHalf, BsWind } from "react-icons/bs";

export const ChoiceWeatherDay: FC<WeatherDayData> = ({ day }) => {
  if (!day) {
    return null;
  }
  const imageSrc = `https:${day.condition.icon.replace("64x64", "128x128")}`;

  return (
    <div className="weather-day text-center text-sm !bg-indigo !bg-opacity-100 text-white">
      <Image
        priority
        src={imageSrc}
        width={80}
        height={80}
        alt={day?.condition.text}
        className="inline-block"
      />
      <div className="mt-1">{day.condition.text}.</div>
      <div className="flex quick-stats">
        <div className="stat">
          <span>
            <BsWind />
          </span>
          {Math.round(day.maxwind_mph)}mph
        </div>

        <div className="stat">
          <span>
            <BsThermometerHalf />
          </span>
          {Math.round(day.avgtemp_c)}°C
        </div>
      </div>
    </div>
  );
};
