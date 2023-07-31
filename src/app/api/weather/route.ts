import { NextRequest, NextResponse } from "next/server";

export type WeatherDayData = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_mph: number;
    totalsnow_cm: number;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
    };
    uv: number;
  };
};

export type WeatherResponse = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  forecast: {
    forecastday: WeatherDayData[];
  };
};

export const GET = async (req: NextRequest) => {
  const longitude: string | null = req.nextUrl.searchParams.get("longitude");
  const latitude: string | null = req.nextUrl.searchParams.get("latitude");
  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: '"longitude" and/or "latitude" is missing from request.' },
      { status: 400 }
    );
  }

  return await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}&days=4&aqi=no&alerts=no`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((data: WeatherResponse) => {
      return NextResponse.json(data, { status: 200 });
    })
    .catch((e: Error) => {
      NextResponse.json({ error: e.message }, { status: 400 });
    });
};
