import { NextResponse } from "next/server";
import carModels from "@/utils/car-models.json";

export async function GET() {
  try {
    const makes = carModels.map((item) => item.make).sort();

    return NextResponse.json({
      status: "success",
      data: makes,
    });
  } catch (error) {
    console.error("Error fetching makes:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch vehicle makes",
      },
      { status: 500 }
    );
  }
}
