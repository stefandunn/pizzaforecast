"use client";

import { FC } from "react";
import { OptionProps } from "./Option.types";
import Image from "next/image";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { selectorOptionState } from "@/states/selector.states";

export const Option: FC<OptionProps> = ({
  name,
  imageSrc,
  selectorId,
  isMobile = false,
}) => {
  const [option, setOption] = useRecoilState(selectorOptionState(selectorId));

  return (
    <>
      <input
        type="radio"
        name="oven"
        onChange={() => {
          setOption(name);
        }}
        className="hidden"
        id={`oven-${name}`}
      />
      <label
        className={clsx("oven block", option === name && "oven-active")}
        htmlFor={`oven-${name}`}
      >
        <div>
          <Image
            src={imageSrc}
            alt={name}
            width={isMobile ? 100 : 200}
            height={isMobile ? 100 : 200}
            quality={isMobile ? 45 : 65}
          />
          <span className="block mt-2 font-display text-lg">{name}</span>
        </div>
      </label>
    </>
  );
};
