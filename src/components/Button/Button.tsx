import { FC } from "react";
import { ButtonProps } from "./Button.types";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import clsx from "clsx";

export const Button: FC<ButtonProps> = ({
  children,
  className,
  primary,
  secondary,
  loading = false,
  ...props
}) => {
  const isPrimary = (!primary && !secondary) || primary;

  return (
    <button
      className={clsx(
        "button relative",
        `button-${isPrimary ? "primary" : "secondary"}`,
        { "button-loading": loading },
        className
      )}
      {...props}
    >
      {children}
      {loading && (
        <span className="button-loader">
          <CgSpinnerTwoAlt className="text-xl animate-spin" />
        </span>
      )}
    </button>
  );
};
