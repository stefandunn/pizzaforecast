import { MouseEventHandler } from "react";

export type LocationButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onError?: (error: string) => unknown;
  onSuccess?: (coords: GeolocationCoordinates) => unknown;
};
