import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";
import { pathname } from "@/utils/url";

export const Logo: FC = () => {
  const isNotHome = pathname() !== "/";

  return (
    <div id="logo" className={clsx(isNotHome && "cursor-pointer")}>
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
