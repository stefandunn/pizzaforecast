"use client";

import { FC, MouseEventHandler, useState } from "react";
import { Button } from "../Button/Button";
import { globalState } from "@/utils/state";
import { LocationButtonProps } from "./LocatorButton.types";

export const LocatorButton: FC<LocationButtonProps> = ({
  onClick: onButtonClick,
  onError,
  onSuccess,
}) => {
  const [locating, setLocating] = useState<boolean>(false);

  const handleLocateMe: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onButtonClick) {
      onButtonClick(e);
    }
    setLocating(true);
    getLocation()
      .then((position) => {
        globalState.set("location", position);
        if (onSuccess) {
          onSuccess(position);
        }
      })
      .catch(() => {
        if (onError) {
          onError("Could not find location");
        }
      })
      .finally(() => {
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
    <Button primary loading={locating} onClick={handleLocateMe}>
      Locate me
    </Button>
  );
};
