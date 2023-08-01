import { WeatherChoice } from "@/components/WeatherChoice/WeatherChoice";
import { NextPage } from "next";

const MakePizzaWhen: NextPage = () => {
  return (
    <main className="flex items-start mt-[100px] justify-center flex-grow p-5">
      <h1>HELLO</h1>
      <WeatherChoice />
    </main>
  );
};

export default MakePizzaWhen;
