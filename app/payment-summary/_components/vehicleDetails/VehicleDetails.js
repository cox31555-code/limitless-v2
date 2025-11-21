"use client";

import React from "react";
import styles from "./vehicleDetails.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const VehicleDetails = ({ data, carUsage, insuranceType }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getVehicleDescription = () => {
    if (!data) return "N/A";
    const parts = [];
    if (data.make) parts.push(data.make);
    if (data.model) parts.push(data.model);
    return parts.join(", ").toUpperCase();
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h2 className={`${styles.mainTitle} ${plusJakartaSans.className}`}>
          Your car cover in short
        </h2>
        <p className={styles.subtitle}>
          (Full details on the next page)
        </p>
      </div>
      <div className={styles.vehicleCard}>
        <div className={styles.cardContent}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.carIcon}
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#0388ff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 79.500 37.583 C 77.850 37.811, 71.430 38.503, 65.234 39.120 L 53.968 40.242 49.579 45.123 C 47.150 47.825, 43.894 53.111, 42.285 56.964 C 39.427 63.811, 39.351 63.891, 37.617 61.865 C 36.032 60.015, 34.943 59.842, 26.844 60.153 C 18.116 60.489, 17.743 60.602, 14.917 63.766 C 10.645 68.548, 10.823 74.023, 15.400 78.600 C 17.270 80.470, 19.608 82, 20.596 82 C 22.039 82, 21.761 82.651, 19.179 85.315 C 17.412 87.138, 15.524 90.173, 14.983 92.058 C 13.595 96.898, 13.701 153.843, 15.105 157.872 C 15.713 159.616, 17.033 161.483, 18.039 162.021 C 19.045 162.559, 24.995 163, 31.260 163 C 41.874 163, 42.800 162.842, 44.826 160.686 C 46.532 158.870, 47 157.147, 47 152.686 L 47 147 99.500 147 L 152 147 152 150.935 C 152 155.700, 153.481 159.883, 155.789 161.637 C 156.958 162.525, 161.167 162.946, 169.076 162.968 C 180.243 162.999, 180.737 162.909, 183.076 160.421 L 185.500 157.842 185.814 129.171 C 186.204 93.605, 185.939 91.045, 181.336 85.950 L 177.838 82.079 180.422 81.430 C 184.457 80.417, 188 75.513, 188 70.939 C 188 68.035, 187.251 66.193, 185.083 63.766 C 182.234 60.575, 181.948 60.492, 172.705 60.158 C 163.756 59.834, 163.155 59.941, 161.621 62.130 C 160.670 63.488, 160 63.867, 160 63.047 C 160 60.109, 152.762 47.176, 149.214 43.775 C 145.772 40.475, 144.805 40.128, 136 39.035 C 126.518 37.858, 85.184 36.795, 79.500 37.583 M 68.531 45.525 C 55.136 46.978, 55.044 47.034, 50.263 56.468 C 48.177 60.584, 44 71.381, 44 72.657 C 44 72.845, 69.200 73, 100 73 C 130.800 73, 156 72.845, 156 72.657 C 156 71.381, 151.823 60.584, 149.737 56.468 C 144.911 46.944, 145.097 47.048, 129.991 45.450 C 113.648 43.722, 84.828 43.757, 68.531 45.525 M 20.170 67.874 C 19.414 68.353, 18.982 69.966, 19.170 71.609 C 19.490 74.416, 19.681 74.509, 25.750 74.798 L 32 75.095 32 71.048 L 32 67 26.750 67.015 C 23.862 67.024, 20.901 67.410, 20.170 67.874 M 168 71.048 L 168 75.095 174.250 74.798 C 180.319 74.509, 180.510 74.416, 180.830 71.609 C 181.251 67.919, 179.791 67.034, 173.250 67.015 L 168 67 168 71.048 M 33.324 83.750 C 25.136 88.835, 23.511 90.136, 22.159 92.684 C 20.660 95.509, 20.552 135.294, 22.035 138.066 C 22.962 139.798, 24.218 140, 34.035 140 L 45 140 45.006 137.250 C 45.021 129.507, 50.260 121.043, 56.702 118.351 C 61.410 116.384, 138.590 116.384, 143.298 118.351 C 149.740 121.043, 154.979 129.507, 154.994 137.250 L 155 140 165.965 140 C 175.782 140, 177.038 139.798, 177.965 138.066 C 179.448 135.294, 179.340 95.509, 177.841 92.684 C 176.489 90.136, 174.864 88.835, 166.676 83.750 L 160.637 80 100 80 L 39.363 80 33.324 83.750 M 31.315 90.007 C 26.307 92.025, 25.567 99.389, 29.726 105.804 C 31.226 108.117, 33.224 110.254, 34.168 110.553 C 35.111 110.853, 42.162 111.188, 49.836 111.299 C 62.321 111.479, 64.010 111.300, 65.894 109.595 C 68.498 107.239, 68.603 103.603, 66.137 101.137 C 63.296 98.296, 51.488 93.043, 43.145 90.909 C 34.853 88.788, 34.421 88.756, 31.315 90.007 M 156.462 90.919 C 148.370 93.084, 136.590 98.410, 133.863 101.137 C 131.441 103.559, 131.489 107.228, 133.972 109.475 C 135.689 111.029, 137.844 111.246, 150.632 111.154 C 164.454 111.054, 165.464 110.914, 167.755 108.774 C 175.283 101.744, 174.571 90.825, 166.500 89.521 C 164.850 89.255, 160.333 89.884, 156.462 90.919 M 33.666 96.732 C 33.377 97.199, 33.810 98.963, 34.628 100.651 C 36.010 103.505, 36.588 103.766, 42.807 104.354 C 46.488 104.701, 51.750 104.970, 54.500 104.951 L 59.500 104.916 56 103.002 C 49.155 99.257, 34.626 95.179, 33.666 96.732 M 158 97.602 C 154.975 98.411, 149.800 100.369, 146.500 101.955 L 140.500 104.837 145.500 104.911 C 148.250 104.952, 153.512 104.701, 157.193 104.354 C 163.412 103.766, 163.990 103.505, 165.372 100.651 C 167.811 95.615, 166.878 95.229, 158 97.602 M 61.942 123.925 C 55.453 125.952, 52 130.460, 52 136.901 L 52 140 100 140 L 148 140 148 136.901 C 148 132.343, 145.165 127.150, 141.615 125.206 C 138.857 123.695, 134.264 123.479, 101.500 123.313 C 81.150 123.210, 63.349 123.486, 61.942 123.925 M 21 150.893 L 21 156 31 156 L 41 156 41 151.500 L 41 147 32.582 147 C 27.952 147, 23.452 146.727, 22.582 146.393 C 21.267 145.888, 21 146.647, 21 150.893 M 168.250 146.745 L 159 147.075 159 151.538 L 159 156 169 156 L 179 156 179 151 C 179 148.250, 178.662 146.093, 178.250 146.208 C 177.838 146.322, 173.338 146.564, 168.250 146.745"/>
            </svg>
          </div>
          <div className={styles.vehicleInfo}>
            <h3 className={`${styles.vehicleName} ${plusJakartaSans.className}`}>
              {getVehicleDescription()}
            </h3>
            <div className={styles.registrationBadge}>
              {data?.registrationNumber || "N/A"}
            </div>
            <button className={styles.editLink}>
              Edit car details
            </button>
          </div>
        </div>
      </div>

      {insuranceType === "Annual" && (
        <>
          <div className={styles.specificationSection}>
            <h4 className={styles.sectionHeading}>Vehicle Specification</h4>
            <div className={styles.specGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Vehicle Type</span>
                <span className={styles.specValue}>{data?.type || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Fuel Type</span>
                <span className={styles.specValue}>{data?.fuel || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Colour</span>
                <span className={styles.specValue}>{data?.colour || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Transmission</span>
                <span className={styles.specValue}>{data?.transmission || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Doors</span>
                <span className={styles.specValue}>{data?.doors || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Voluntary Excess</span>
                <span className={styles.specValue}>£{carUsage?.voluntaryExcess || "0"}</span>
              </div>
            </div>
          </div>

          <div className={styles.specificationSection}>
            <h4 className={styles.sectionHeading}>Vehicle Worth & Purchase Details</h4>
            <div className={styles.specGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Vehicle Worth</span>
                <span className={styles.specValue}>{data?.worth || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Purchase Date</span>
                <span className={styles.specValue}>{formatDate(data?.purchaseDate)}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Legal Owner</span>
                <span className={styles.specValue}>{data?.legalOwner || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className={styles.specificationSection}>
            <h4 className={styles.sectionHeading}>Safety & Security Features</h4>
            <div className={styles.specGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Tracking Device</span>
                <span className={styles.specValue}>{data?.trackingDevice || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Alarm / Immobiliser</span>
                <span className={styles.specValue}>{data?.alarmImmobiliser || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Imported Vehicle</span>
                <span className={styles.specValue}>{data?.importedVehicle || "N/A"}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Vehicle Modified</span>
                <span className={styles.specValue}>{data?.vehicleModified || "N/A"}</span>
              </div>
              {data?.vehicleModifications && data?.vehicleModifications.length > 0 && (
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Modifications</span>
                  <span className={styles.specValue}>{data?.vehicleModifications.join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default VehicleDetails;
