"use client";

import { FC, useEffect } from "react";
import { Option } from "./Option/Option";
import clsx from "clsx";
import { SelectorProps } from "./Selector.types";
import { useRecoilState } from "recoil";
import { selectorOptionState } from "@/states/selector.states";

export const Selector: FC<SelectorProps> = ({
  className,
  selectorId,
  options,
}) => {
  const [optionSelected, setOptionSelected] = useRecoilState(
    selectorOptionState(selectorId)
  );

  useEffect(() => {
    if (!optionSelected) {
      return;
    }
    if (!options.map((option) => option.name).includes(optionSelected)) {
      setOptionSelected(undefined);
    }
  }, [options, optionSelected, setOptionSelected]);

  return (
    <div className={clsx("oven-selector", className)}>
      <ul>
        {options.map((option) => (
          <li key={option.name}>
            <Option selectorId={selectorId} {...option} />
          </li>
        ))}
      </ul>
    </div>
  );
};
