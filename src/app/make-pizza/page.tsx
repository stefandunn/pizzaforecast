import { OvenSelector } from "@/components/OvenSelector/OvenSelector";
import { Weather } from "@/components/Weather/Weather";
import { NextPage } from "next";

const MakePizzaPage: NextPage = () => {
  return (
    <main className="flex items-start mt-[100px] justify-center flex-grow p-5">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-pink mb-6">Let&apos;s make pizza</h1>
        <Weather className="mb-2" />
        <h2>Which oven do you have?</h2>
        <OvenSelector />
        <div></div>
      </div>
    </main>
  );
};

export default MakePizzaPage;
