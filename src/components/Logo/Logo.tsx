"use client";

import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Logo: FC = () => {
  const pathname = usePathname();
  const isNotHome = pathname !== "/";

  return (
    <Link href="/" id="logo" className={clsx(isNotHome && "cursor-pointer")}>
      <Image
        priority={isNotHome}
        src="/images/pizza-slice.png"
        width={60}
        height={60}
        className="object-contain"
        alt="Pizza Forecast"
      />
      {isNotHome && <span>Start Again</span>}
    </Link>
  );
};
