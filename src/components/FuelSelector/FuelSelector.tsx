"use client";

import { FC, useEffect, useMemo, useRef } from "react";
import { Selector } from "../Selector/Selector";
import { useRecoilValue } from "recoil";
import { selectorOptionState } from "@/states/selector.states";

export const FuelSelector: FC<{ className?: string }> = ({ className }) => {
  const oven = useRecoilValue(selectorOptionState("oven"));
  const fuel = useRecoilValue(selectorOptionState("fuel"));
  const prevFuelRef = useRef<typeof fuel>(fuel);

  useEffect(() => {
    if (!fuel) {
      return;
    }
    if (!prevFuelRef.current) {
      prevFuelRef.current = fuel;
      const fuelSelector = document.getElementById("button-complete");
      if (fuelSelector) {
        setTimeout(() => {
          (fuelSelector as HTMLDivElement).scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [fuel]);

  const availableFuels = useMemo(() => {
    const fuels = [
      {
        name: "Wood",
        imageSrc: "/images/wood.png",
      },
      {
        name: "Gas",
        imageSrc: "/images/gas.png",
      },
      {
        name: "Charcoal",
        imageSrc: "/images/charcoal.png",
      },
      {
        name: "Pellets",
        imageSrc: "/images/pellets.png",
      },
      {
        name: "Electric",
        imageSrc: "/images/electric.png",
      },
    ];
    if (oven?.toLocaleLowerCase().includes("koda")) {
      return fuels.slice(1, 2);
    }

    if (oven?.toLocaleLowerCase().includes("fyra")) {
      return fuels.slice(3, 4);
    }

    if (oven?.toLocaleLowerCase().includes("volt")) {
      return fuels.slice(4, 5);
    }
    return fuels.slice(0, 3);
  }, [oven]);

  if (!oven) {
    return null;
  }

  return (
    <div className={className} id="fuel-selector">
      <h2>Which fuel do you prefer to use?</h2>
      <Selector {...{ selectorId: "fuel", options: availableFuels }} />
    </div>
  );
};
