import { selector } from "recoil";
import { locationState } from "./location.states";
import { WeatherResponse } from "@/app/api/weather/route";

export const weatherState = selector<WeatherResponse | undefined>({
  key: "weather",
  get: async ({ get }) => {
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
