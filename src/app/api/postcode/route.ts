import { NextRequest, NextResponse } from "next/server";

type PostcodeSearchResponseData = {
  status: number;
  result: {
    postcode: string;
    quality: number;
    longitude: number;
    latitude: number;
  };
};

export const GET = async (req: NextRequest) => {
  const postcode: string | null = req.nextUrl.searchParams.get("postcode");
  if (!postcode) {
    return NextResponse.json(
      { error: '"postcode" is missing from request.' },
      { status: 400 }
    );
  }
  return await fetch(`https://api.postcodes.io/postcodes/${postcode}`)
    .then((response) => response.json())
    .then((data: PostcodeSearchResponseData) => {
      const { latitude, longitude } = data.result;
      return NextResponse.json(
        { longitude, latitude },
        { status: data.status }
      );
    })
    .catch((e: Error) => {
      return NextResponse.json({ error: e.message }, { status: 400 });
    });
};
