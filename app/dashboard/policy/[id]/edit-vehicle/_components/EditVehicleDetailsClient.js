"use client";

import React, { useState, useReducer, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import { SelectPicker } from "rsuite";
import styles from "./editVehicleDetailsClient.module.css";
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

const initialVehicleState = {
  makes: ["Audi", "BMW", "Ford", "Honda", "Toyota", "Volkswagen"],
  options: {
    models: [],
    years: [],
    doors: [],
    fuels: [],
    transmissions: [],
  },
  values: {
    type: "",
    make: "",
    model: "",
    year: "",
    doors: "",
    fuel: "",
    transmission: "",
    colour: "",
  },
};

const vehicleReducer = (state, action) => {
  switch (action.type) {
    case "SET_MAKES":
      return { ...state, makes: action.payload };
    case "SET_VEHICLE_DATA":
      return {
        ...state,
        options: action.payload.options || state.options,
        values: { ...state.values, ...(action.payload.values || {}) },
      };
    case "CLEAR_OPTIONS":
      return {
        ...state,
        options: {
          models: [],
          years: [],
          doors: [],
          fuels: [],
          transmissions: [],
        },
      };
    default:
      return state;
  }
};

const EditVehicleDetailsClient = ({ policyId, policy, vehicleDetails }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, dispatch] = useReducer(vehicleReducer, initialVehicleState);
  const [forceUpdate, setForceUpdate] = useState(0);

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
  const selectedType = watch("vehicleDetails.type");
  const selectedMake = watch("vehicleDetails.make");
  const selectedYear = watch("vehicleDetails.year");
  const selectedFuel = watch("vehicleDetails.fuel");

  // Fetch vehicle options when make is selected
  useEffect(() => {
    if (selectedMake) {
      const defaultOptions = {
        models: ["Model A", "Model B", "Model C"],
        years: ["2024", "2023", "2022", "2021", "2020"],
        doors: ["2", "4", "5"],
        fuels: ["Petrol", "Diesel", "Hybrid", "Electric"],
        transmissions: ["Manual", "Automatic"],
      };
      dispatch({
        type: "SET_VEHICLE_DATA",
        payload: { values: {}, options: defaultOptions },
      });
    }
  }, [selectedMake]);

  const handleDropdownChange = (field, value) => {
    setValue(`vehicleDetails.${field}`, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleSave = async (data) => {
    try {
      setIsSubmitting(true);
      // Simulate API call
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
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57,-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.greetingArea}>
            <h1 className={`${styles.greetingTitle} ${plusJakartaSans.className}`}>Edit Vehicle Details</h1>
            <p className={styles.greetingSubtitle}>Update your vehicle information</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>Dashboard</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbItem}>Manage Policy</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbItem}>Policy summary</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Edit vehicle details</span>
      </div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.infoBox}>
          <p className={styles.infoText}>Please complete each field in order to unlock the next selection.</p>
        </div>

        <form onSubmit={form.handleSubmit(handleSave)} className={styles.formContainer}>
          {/* Vehicle Type */}
          <div className={styles.formSection}>
            <label className={styles.fieldLabel}>Vehicle Type</label>
            <Dropdown
              label=""
              selected={selectedType}
              options={vehicleTypes}
              setSelected={(value) => {
                handleDropdownChange("type", value);
                setValue("vehicleDetails.make", "", { shouldValidate: false });
              }}
              placeholder="Select vehicle type"
              disabled={false}
            />
          </div>

          {/* Make - Only shows if type is selected */}
          {selectedType && (
            <div className={styles.formSection}>
              <label className={styles.fieldLabel}>Make</label>
              <Dropdown
                label=""
                selected={selectedMake}
                options={state.makes}
                setSelected={(value) => handleDropdownChange("make", value)}
                placeholder="Select make"
                disabled={false}
              />
            </div>
          )}

          {/* Model - Only shows if make is selected */}
          {selectedMake && (
            <div className={styles.formSection}>
              <label className={styles.fieldLabel}>Model</label>
              <div className={styles.rsuiteFormGroup}>
                <SelectPicker
                  key={`model-${forceUpdate}`}
                  data={state.options.models.map((option) => ({ label: option, value: option }))}
                  placeholder="Select model"
                  disabled={!selectedMake || state.options.models.length === 0}
                  value={watch("vehicleDetails.model") || null}
                  onChange={(value) => handleDropdownChange("model", value || "")}
                  style={{ width: "100%", minHeight: "4.4rem", padding: "0.8rem 1rem", fontSize: "1rem" }}
                />
              </div>
            </div>
          )}

          {/* Year - Only shows if make is selected */}
          {selectedMake && (
            <div className={styles.formSection}>
              <label className={styles.fieldLabel}>Year</label>
              <div className={styles.rsuiteFormGroup}>
                <SelectPicker
                  key={`year-${forceUpdate}`}
                  data={state.options.years.map((option) => ({ label: option, value: option }))}
                  placeholder="Select year"
                  disabled={!selectedMake || state.options.years.length === 0}
                  value={watch("vehicleDetails.year") || null}
                  onChange={(value) => handleDropdownChange("year", value || "")}
                  style={{ width: "100%", minHeight: "4.4rem", padding: "0.8rem 1rem", fontSize: "1rem" }}
                />
              </div>
            </div>
          )}

          {/* Doors - Only shows if year is selected */}
          {selectedYear && (
            <div className={styles.formSection}>
              <label className={styles.fieldLabel}>Doors</label>
              <div className={styles.rsuiteFormGroup}>
                <SelectPicker
                  key={`doors-${forceUpdate}`}
                  data={state.options.doors.map((option) => ({ label: option, value: option }))}
                  placeholder="Select doors"
                  disabled={!selectedYear || state.options.doors.length === 0}
                  value={watch("vehicleDetails.doors") || null}
                  onChange={(value) => handleDropdownChange("doors", value || "")}
                  style={{ width: "100%", minHeight: "4.4rem", padding: "0.8rem 1rem", fontSize: "1rem" }}
                />
              </div>
            </div>
          )}

          {/* Fuel Type - Only shows if year is selected */}
          {selectedYear && (
            <div className={styles.formSection}>
              <label className={styles.fieldLabel}>Fuel Type</label>
              <div className={styles.rsuiteFormGroup}>
                <SelectPicker
                  key={`fuel-${forceUpdate}`}
                  data={state.options.fuels.map((option) => ({ label: option, value: option }))}
                  placeholder="Select fuel type"
                  disabled={!selectedYear || state.options.fuels.length === 0}
                  value={watch("vehicleDetails.fuel") || null}
                  onChange={(value) => handleDropdownChange("fuel", value || "")}
                  style={{ width: "100%", minHeight: "4.4rem", padding: "0.8rem 1rem", fontSize: "1rem" }}
                />
              </div>
            </div>
          )}

          {/* Transmission - Only shows if fuel is selected */}
          {selectedFuel && (
            <div className={styles.formSection}>
              <label className={styles.fieldLabel}>Transmission</label>
              <div className={styles.rsuiteFormGroup}>
                <SelectPicker
                  key={`transmission-${forceUpdate}`}
                  data={state.options.transmissions.map((option) => ({ label: option, value: option }))}
                  placeholder="Select transmission"
                  disabled={!selectedFuel || state.options.transmissions.length === 0}
                  value={watch("vehicleDetails.transmission") || null}
                  onChange={(value) => handleDropdownChange("transmission", value || "")}
                  style={{ width: "100%", minHeight: "4.4rem", padding: "0.8rem 1rem", fontSize: "1rem" }}
                />
              </div>
            </div>
          )}

          {/* Colour - Always available */}
          <div className={styles.formSection}>
            <label className={styles.fieldLabel}>Colour</label>
            <div className={styles.rsuiteFormGroup}>
              <SelectPicker
                data={carColors.map((option) => ({ label: option, value: option }))}
                placeholder="Select colour"
                value={watch("vehicleDetails.colour") || null}
                onChange={(value) => handleDropdownChange("colour", value || "")}
                style={{ width: "100%", minHeight: "4.4rem", padding: "0.8rem 1rem", fontSize: "1rem" }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelBtn}
              disabled={isSubmitting}
            >
              Back to registration lookup
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
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
