"use client";

import { FC, KeyboardEvent, useState } from "react";
import { LocatorButton } from "../LocatorButton/LocatorButton";
import { Button } from "../Button/Button";
import { HiSearch } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { locationState } from "@/states/location.states";

export const LocationForm: FC = () => {
  const [disablePostcode, setDisablePostcode] = useState<boolean>(false);
  const [postcode, setPostcode] = useState<string>("");
  const [postcodeLoading, setPostcodeLoading] = useState<boolean>(false);
  const [locateError, setLocateError] = useState<string>("");
  const [postcodeFetchError, setPostcodeFetchError] = useState<string>("");
  const setLocation = useSetRecoilState(locationState);

  const router = useRouter();

  const handlePostcodeSearch = () => {
    if (!postcode.match(/^([a-zA-Z]{1,2}[a-zA-Z\d]{1,2})\s?(\d[a-zA-Z]{2})$/)) {
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
      });
  };

  const onLocationFound = (position: GeolocationCoordinates) => {
    const { longitude, latitude } = position;
    setLocation({ longitude, latitude });
    router.push("/make-pizza");
  };

  return (
    <>
      <div className="inline-flex items-stretch gap-3">
        <input
          disabled={disablePostcode}
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          type="text"
          className="input uppercase placeholder:normal-case w-full max-w-[300px]"
          placeholder="Postcode"
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && e.currentTarget.value) {
              handlePostcodeSearch();
            }
          }}
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
          disabled={postcodeLoading}
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
