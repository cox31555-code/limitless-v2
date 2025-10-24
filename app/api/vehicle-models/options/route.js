import { NextResponse } from "next/server";
import carModels from "@/utils/car-models.json";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const make = searchParams.get("make");
    const model = searchParams.get("model");
    const year = searchParams.get("year");
    const doors = searchParams.get("doors");
    const fuel = searchParams.get("fuel");

    const makeData = carModels.find(
      (item) => item.make.toLowerCase() === make?.toLowerCase()
    );

    if (!makeData) {
      return NextResponse.json(
        {
          status: "error",
          message: "Make not found",
        },
        { status: 404 }
      );
    }

    let filteredModels = makeData.models;

    if (model) {
      filteredModels = filteredModels.filter(
        (m) => m.model.toLowerCase() === model.toLowerCase()
      );
    }

    if (year && filteredModels.length > 0) {
      filteredModels = filteredModels.filter((m) => {
        const yearRange = m.year;
        if (yearRange.includes("-")) {
          const [start, end] = yearRange.split("-").map(Number);
          const selectedYear = Number(year);
          return selectedYear >= start && selectedYear <= end;
        }
        return m.year === year;
      });
    }

    if (doors && filteredModels.length > 0) {
      filteredModels = filteredModels.filter((m) =>
        m.doors.toLowerCase().includes(doors.toLowerCase())
      );
    }

    if (fuel && filteredModels.length > 0) {
      filteredModels = filteredModels.filter(
        (m) => m.fuel.toLowerCase() === fuel.toLowerCase()
      );
    }

    const getUniqueValues = (key) => {
      return [
        ...new Set(makeData.models.map((m) => m[key]).filter(Boolean)),
      ].sort();
    };

    const getYears = () => {
      const years = new Set();
      makeData.models.forEach((m) => {
        const yearRange = m.year;
        if (yearRange.includes("-")) {
          const [start, end] = yearRange.split("-").map(Number);
          for (let y = start; y <= end; y++) {
            years.add(y.toString());
          }
        } else {
          years.add(yearRange);
        }
      });
      return Array.from(years)
        .map(Number)
        .sort((a, b) => b - a)
        .map(String);
    };

    const options = {
      models: getUniqueValues("model"),
      years: getYears(),
      doors: getUniqueValues("doors"),
      fuel: getUniqueValues("fuel"),
      transmissions: getUniqueValues("transmission"),
    };

    let autoSelect = {};

    if (!model && options.models.length === 1) {
      autoSelect.model = options.models[0];
    }

    if (!year && options.years.length === 1) {
      autoSelect.year = options.years[0];
    }

    if (!doors && options.doors.length === 1) {
      autoSelect.doors = options.doors[0];
    }

    if (!fuel && options.fuel.length === 1) {
      autoSelect.fuel = options.fuel[0];
    }

    if (
      !searchParams.get("transmission") &&
      options.transmissions.length === 1
    ) {
      autoSelect.transmission = options.transmissions[0];
    }

    return NextResponse.json({
      status: "success",
      data: {
        options,
        autoSelect,
      },
    });
  } catch (error) {
    console.error("Error fetching vehicle options:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch vehicle options",
      },
      { status: 500 }
    );
  }
}
