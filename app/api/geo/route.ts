import { NextRequest, NextResponse } from "next/server";
import { countryNames } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ?? "UNKNOWN";

  const countryName =
    countryNames[country]?.en ?? country;

  return NextResponse.json({ country, countryName });
}
