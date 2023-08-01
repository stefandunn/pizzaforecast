import { selector } from "recoil";
import { weatherState } from "./weather.states";
import { selectorOptionState } from "./selector.states";

export const weatherDayChoiceState = selector({
  key: "weatherDayChoice",
  get: ({ get }) => {
    const weather = get(weatherState);
    const oven = get(selectorOptionState("oven"));
    const fuel = get(selectorOptionState("fuel"));
  },
});
