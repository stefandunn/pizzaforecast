import Image from "next/image";
import pizzaImage from "../../public/images/pizza-weather.jpg";
import { LocationForm } from "@/components/LocationForm/LocationForm";
import { headers } from "next/headers";
import { getDevice } from "@/utils/helpers";

export default function Home() {
  const isMobile =
    getDevice(headers().get("user-agent") as string) !== "desktop";

  return (
    <main className="flex justify-stretch md:items-stretch md:justify-normal flex-col-reverse md:flex-row flex-grow">
      <div className="md:w-1/2 md:h-auto basis-1/2 flex-grow relative">
        <Image
          src={pizzaImage}
          alt="Pizza graphic"
          width={pizzaImage.width / (isMobile ? 6 : 4)}
          height={pizzaImage.height / (isMobile ? 6 : 4)}
          quality={isMobile ? 55 : 70}
          className="object-cover object-center absolute left-0 top-0 w-full h-full"
          priority
        />
      </div>
      <div className="p-3 md:w-1/2 md:h-auto basis-1/2 flex-grow relative flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-pink">Pizza Forecast</h1>
          <h2 className="text-indigo">
            Find the best time to{" "}
            <span className="whitespace-nowrap">cook pizza.</span>
          </h2>
          <p className="my-4">
            Simply put in your postcode or click &quot;Locate me&quot; to begin.
          </p>
          <div>
            <LocationForm />
          </div>
        </div>
      </div>
    </main>
  );
}
