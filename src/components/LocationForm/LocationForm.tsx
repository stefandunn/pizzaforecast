"use client";

import { FC, MouseEventHandler, useState } from "react";
import { LocatorButton } from "../LocatorButton/LocatorButton";
import { Button } from "../Button/Button";
import { HiSearch } from "react-icons/hi";
import { globalState } from "@/utils/state";
import { useRouter } from "next/navigation";

export const LocationForm: FC = () => {
  const [disablePostcode, setDisablePostcode] = useState<boolean>(false);
  const [postcode, setPostcode] = useState<string>("");
  const [postcodeLoading, setPostcodeLoading] = useState<boolean>(false);
  const [locateError, setLocateError] = useState<string>("");
  const [postcodeFetchError, setPostcodeFetchError] = useState<string>("");

  const router = useRouter();

  const handlePostcodeSearch: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!postcode.match(/^([a-zA-Z]{1,2}[a-zA-Z\d]{1,2})\s(\d[a-zA-Z]{2})$/)) {
      alert("Your postcode is not a valid UK postcode");
      return;
    }
    setPostcodeFetchError("");
    setPostcodeLoading(true);
    fetch(`/api/postcode?postcode=${postcode}`)
      .then(async (response) => {
        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error);
        }
        return response.json();
      })
      .then((data: GeolocationCoordinates) => {
        onLocationFound(data);
      })
      .catch((error: Error) => {
        setPostcodeLoading(false);
        setPostcodeFetchError(error.message);
        console.log({ error: error.message });
      });
  };

  const onLocationFound = (position: GeolocationCoordinates) => {
    globalState.set("position", position);
    router.push("/oven");
  };

  return (
    <>
      <div className="inline-flex items-stretch gap-3">
        <input
          disabled={disablePostcode}
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          type="text"
          className="input uppercase placeholder:normal-case"
          placeholder="Postcode"
        />
        <Button onClick={handlePostcodeSearch} loading={postcodeLoading}>
          <HiSearch />
        </Button>
      </div>
      {postcodeFetchError.length > 0 && (
        <p className="mt-2 error">{postcodeFetchError}</p>
      )}
      <div className="mt-4">
        {locateError.length > 0 && <p className="mb-2 error">{locateError}</p>}
        <LocatorButton
          onClick={() => {
            setLocateError("");
            setDisablePostcode(true);
          }}
          onSuccess={onLocationFound}
          onError={(error) => {
            setLocateError(error);
            setDisablePostcode(false);
          }}
        />
      </div>
    </>
  );
};
