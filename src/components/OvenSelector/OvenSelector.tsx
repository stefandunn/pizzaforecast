"use client";

import { FC, useEffect, useRef } from "react";
import { Selector } from "../Selector/Selector";
import { useRecoilValue } from "recoil";
import { selectorOptionState } from "@/states/selector.states";

export const OvenSelector: FC<{ className?: string }> = ({ className }) => {
  const oven = useRecoilValue(selectorOptionState("oven"));
  const prevOvenRef = useRef<typeof oven>(oven);

  useEffect(() => {
    if (!oven) {
      return;
    }
    if (!prevOvenRef.current) {
      prevOvenRef.current = oven;
      const fuelSelector = document.getElementById("fuel-selector");
      if (fuelSelector) {
        setTimeout(() => {
          (fuelSelector as HTMLDivElement).scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [oven]);

  const ovens = [
    {
      name: "Karu 12",
      imageSrc:
        "https://cdn.accentuate.io/4436046250081/1680174179836/oven-menu-karu12-hover.png",
    },
    {
      name: "Karu 12G",
      imageSrc:
        "https://cdn.accentuate.io/6930400411745/1680174186537/Karu-12G.png",
    },
    {
      name: "Karu 16",
      imageSrc:
        "https://cdn.accentuate.io/4878393213025/1680174193792/oven-menu-karu16-hover.png",
    },
    {
      name: "Koda 12",
      imageSrc:
        "https://cdn.accentuate.io/1972605288545/1680174201710/oven-menu-koda12-hover.png",
    },
    {
      name: "Koda 16",
      imageSrc:
        "https://cdn.accentuate.io/4525136969825/1680174208076/oven-menu-koda16-hover.png",
    },
    {
      name: "Fyra",
      imageSrc:
        "https://cdn.accentuate.io/4563907903585/1680174173599/oven-menu-fyra12-hover.png",
    },
    {
      name: "Volt",
      imageSrc:
        "https://cdn.accentuate.io/6916397105249/1680174214737/Volt-12.png",
    },
  ];
  return (
    <div className={className} id="fuel-selector">
      <h2>Which oven do you have?</h2>
      <Selector {...{ selectorId: "oven", options: ovens }} />
    </div>
  );
};
