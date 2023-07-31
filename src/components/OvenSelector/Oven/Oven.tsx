"use client";

import { LocalStorageChangeHandler, globalState } from "@/utils/state";
import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { OvenProps } from "./Oven.types";
import Image from "next/image";
import clsx from "clsx";

export const Oven: FC<OvenProps> = ({ name, imageSrc, isMobile = false }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const onStateChange: LocalStorageChangeHandler = ({
      detail: { key, value },
    }) => {
      if (key === "oven") {
        setIsActive(value === name);
      }
    };

    globalState.addOnChangeListener(onStateChange);

    return () => {
      globalState.removeOnChangeListener(onStateChange);
    };
  }, [name]);

  const handleOvenClick: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.checked) {
      globalState.set("oven", name);
    }
  };

  return (
    <>
      <input
        type="radio"
        name="oven"
        onChange={handleOvenClick}
        className="hidden"
        id={`oven-${name}`}
      />
      <label
        className={clsx("oven block", isActive && "oven-active")}
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
