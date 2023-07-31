"use client";

import { selectorOptionState } from "@/states/selector.states";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { Button } from "../Button/Button";
import clsx from "clsx";
import { HiOutlineArrowNarrowDown } from "react-icons/hi";
import { useRouter } from "next/navigation";

export const CompleteButton: FC<{ className?: string }> = ({ className }) => {
  const oven = useRecoilValue(selectorOptionState("oven"));
  const fuel = useRecoilValue(selectorOptionState("fuel"));
  const router = useRouter();

  if (!oven || !fuel) {
    return null;
  }

  return (
    <div
      className={clsx(className, "text-center", {
        "animate-pulse": oven && fuel,
      })}
      id="button-complete"
    >
      <span className="block mb-2 animate-bounce">
        <HiOutlineArrowNarrowDown className="text-6xl inline-block stroke-indigo" />
      </span>
      <Button
        primary
        onClick={() => {
          router.push("/make-pizza/when");
        }}
      >
        When should I cook?
      </Button>
    </div>
  );
};
