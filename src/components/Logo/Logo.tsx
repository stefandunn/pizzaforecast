"use client";

import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";
import { useRouter } from "next/navigation";

export const Logo: FC<{ isNotHome: boolean }> = ({ isNotHome }) => {
  const router = useRouter();

  const handleLogoClick = () => {
    if (!isNotHome) {
      return;
    }

    router.push("/");
  };

  return (
    <div
      id="logo"
      className={clsx(isNotHome && "cursor-pointer")}
      onClick={handleLogoClick}
    >
      <Image
        src="/images/pizza-slice.png"
        width={60}
        height={60}
        className="object-contain"
        alt="Pizza Forecast"
      />
      {isNotHome && <span>Start Again</span>}
    </div>
  );
};
