import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { registrationNumber } = params;

    if (!registrationNumber || registrationNumber.trim() === "") {
      return NextResponse.json(
        {
          status: "error",
          message: "Registration number is required",
        },
        { status: 400 }
      );
    }

    console.log(
      `DVLA lookup requested for: ${registrationNumber}. This integration requires a backend API setup.`
    );

    return NextResponse.json(
      {
        status: "error",
        message:
          "DVLA vehicle lookup is not currently available. Please enter your vehicle details manually using the 'Don't know the reg yet?' option.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Error in DVLA search:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to search vehicle data",
      },
      { status: 500 }
    );
  }
}
