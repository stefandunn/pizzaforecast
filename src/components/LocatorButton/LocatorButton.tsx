"use client";

import { FC, MouseEventHandler, useState } from "react";
import { Button } from "../Button/Button";
import { LocationButtonProps } from "./LocatorButton.types";

export const LocatorButton: FC<LocationButtonProps> = ({
  onClick: onButtonClick,
  onError,
  onSuccess,
  disabled = false,
}) => {
  const [locating, setLocating] = useState<boolean>(false);

  const handleLocateMe: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onButtonClick) {
      onButtonClick(e);
    }
    setLocating(true);
    getLocation()
      .then((position) => {
        if (onSuccess) {
          onSuccess(position);
        }
      })
      .catch(() => {
        if (onError) {
          onError("Could not find location");
        }
        setLocating(false);
      });
  };

  const getLocation = () =>
    new Promise<GeolocationCoordinates>((resolve, reject) => {
      const success = (position: GeolocationPosition) => {
        resolve(position.coords);
      };

      const error = () => {
        reject(new Error("Sorry, no position available."));
      };

      const options = {
        enableHighAccuracy: true,
        timeout: 15000,
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    });

  return (
    <Button
      primary
      disabled={disabled}
      loading={locating}
      onClick={handleLocateMe}
    >
      Locate me
    </Button>
  );
};
