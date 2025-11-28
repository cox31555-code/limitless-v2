"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import styles from "@/app/annual/get-quote/_components/annualVehicle.module.css";
import editStyles from "./editVehicleDetailsClient.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const carColors = [
  "White", "Black", "Gray", "Silver", "Blue", "Red", "Green", "Brown",
  "Orange", "Beige", "Purple", "Gold", "Yellow",
];

const vehicleTypes = ["Car", "Motorcycle", "Truck", "Bus"];
const vehicleMakes = ["Audi", "BMW", "Ford", "Honda", "Toyota", "Volkswagen"];
const vehicleModels = ["Model A", "Model B", "Model C"];
const vehicleYears = ["2024", "2023", "2022", "2021", "2020"];
const vehicleDoors = ["2", "4", "5"];
const vehicleFuels = ["Petrol", "Diesel", "Hybrid", "Electric"];
const vehicleTransmissions = ["Manual", "Automatic"];

const EditVehicleDetailsClient = ({ policyId, policy, vehicleDetails }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(annualInsuranceSchema),
    defaultValues: {
      vehicleDetails: {
        type: vehicleDetails?.type || "",
        make: vehicleDetails?.make || "",
        model: vehicleDetails?.model || "",
        year: vehicleDetails?.year || "",
        doors: vehicleDetails?.doors || "",
        fuel: vehicleDetails?.fuel || "",
        transmission: vehicleDetails?.transmission || "",
        colour: vehicleDetails?.colour || "",
      },
    },
  });

  const { watch, setValue, formState: { errors } } = form;

  const handleDropdownChange = useCallback((field, value) => {
    setValue(`vehicleDetails.${field}`, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [setValue]);

  const handleSave = async (data) => {
    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Vehicle details updated successfully");
      router.push(`/dashboard/policy/${policyId}`);
    } catch (error) {
      toast.error("Failed to update vehicle details");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={editStyles.container}>
      {/* Hero Section */}
      <section className={editStyles.heroSection}>
        <div className={editStyles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={editStyles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={editStyles.heroContent}>
          <div className={editStyles.greetingArea}>
            <h1 className={`${editStyles.greetingTitle} ${plusJakartaSans.className}`}>Enter Vehicle Details</h1>
            <p className={editStyles.greetingSubtitle}>Back to registration lookup</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className={editStyles.contentWrapper}>
        <form onSubmit={form.handleSubmit(handleSave)} className={editStyles.formContainer}>
          <div className={styles.rows}>
            {/* Vehicle Type and Make Row */}
            <div className={styles.cleanFormGrid2Col}>
              <Dropdown
                label="Vehicle Type"
                selected={watch("vehicleDetails.type") || ""}
                options={vehicleTypes}
                setSelected={(value) => handleDropdownChange("type", value)}
                placeholder="Select vehicle type"
              />
              <Dropdown
                label="Make"
                selected={watch("vehicleDetails.make") || ""}
                options={vehicleMakes}
                setSelected={(value) => handleDropdownChange("make", value)}
                placeholder="Select make"
              />
            </div>

            {/* Model and Year Row */}
            <div className={styles.cleanFormGrid2Col}>
              <Dropdown
                label="Model"
                selected={watch("vehicleDetails.model") || ""}
                options={vehicleModels}
                setSelected={(value) => handleDropdownChange("model", value)}
                placeholder="Select model"
              />
              <Dropdown
                label="Year"
                selected={watch("vehicleDetails.year") || ""}
                options={vehicleYears}
                setSelected={(value) => handleDropdownChange("year", value)}
                placeholder="Select year"
              />
            </div>

            {/* Doors and Fuel Type Row */}
            <div className={styles.cleanFormGrid2Col}>
              <Dropdown
                label="Doors"
                selected={watch("vehicleDetails.doors") || ""}
                options={vehicleDoors}
                setSelected={(value) => handleDropdownChange("doors", value)}
                placeholder="Select doors"
              />
              <Dropdown
                label="Fuel Type"
                selected={watch("vehicleDetails.fuel") || ""}
                options={vehicleFuels}
                setSelected={(value) => handleDropdownChange("fuel", value)}
                placeholder="Select fuel type"
              />
            </div>

            {/* Transmission and Colour Row */}
            <div className={styles.cleanFormGrid2Col}>
              <Dropdown
                label="Transmission"
                selected={watch("vehicleDetails.transmission") || ""}
                options={vehicleTransmissions}
                setSelected={(value) => handleDropdownChange("transmission", value)}
                placeholder="Select transmission"
              />
              <Dropdown
                label="Colour"
                selected={watch("vehicleDetails.colour") || ""}
                options={carColors}
                setSelected={(value) => handleDropdownChange("colour", value)}
                placeholder="Select colour"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className={editStyles.actionButtons}>
            <button
              type="button"
              onClick={() => router.back()}
              className={editStyles.cancelBtn}
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              type="submit"
              className={editStyles.saveBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicleDetailsClient;
