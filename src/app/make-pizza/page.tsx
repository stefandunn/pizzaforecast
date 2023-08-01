import { CompleteButton } from "@/components/CompleteButton/CompleteButton";
import { FuelSelector } from "@/components/FuelSelector/FuelSelector";
import { OvenSelector } from "@/components/OvenSelector/OvenSelector";
import { Weather } from "@/components/Weather/Weather";
import { NextPage } from "next";

const MakePizzaPage: NextPage = () => (
  <main className="flex items-start mt-[100px] justify-center flex-grow p-5">
    <div className="mx-auto max-w-5xl w-full">
      <h1 className="text-pink mb-6">Let&apos;s make pizza</h1>
      <Weather className="mb-8" />
      <OvenSelector className="mb-8" />
      <FuelSelector className="mb-8" />
      <CompleteButton className="mb-8" />
    </div>
  </main>
);

export default MakePizzaPage;
