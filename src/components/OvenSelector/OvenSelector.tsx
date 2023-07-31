import { FC } from "react";
import { OvenProps } from "./Oven/Oven.types";
import { Oven } from "./Oven/Oven";
import { headers } from "next/headers";
import { getDevice } from "@/utils/helpers";

export const OvenSelector: FC = () => {
  const isMobile =
    getDevice(headers().get("user-agent") as string) !== "desktop";

  const ovens: OvenProps[] = [
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
    <div className="oven-selector">
      <ul>
        {ovens.map((oven) => (
          <li key={oven.name}>
            <Oven {...oven} />
          </li>
        ))}
      </ul>
    </div>
  );
};
