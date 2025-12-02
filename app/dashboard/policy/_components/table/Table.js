"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import { useLoading } from "@/contexts/LoadingContext";

const Table = ({ title, columns, data, tableType, showViewButton = true, theme = "default", showTitle = true }) => {
  const router = useRouter();
  const { showLoading } = useLoading();

  const getStatusColor = (remaining) => {
    if (remaining === "Expired" || remaining === "Unpaid") return "expired";
    const days = parseInt(remaining);
    if (isNaN(days)) return "active";
    if (days > 30) return "active";
    if (days > 7) return "active";
    return "active";
  };

  const formatVehicleReg = (reg) => {
    if (!reg) return reg;
    return reg.replace(/^(.{4})(.{3})$/, '$1 $2');
  };

  const getMockPolicyId = (index) => {
    const mockIds = ["ANNUAL-001", "TEMP-001", "IMPOUND-001"];
    return mockIds[index % mockIds.length];
  };

  const getPolicyType = (index) => {
    const types = ["ANNUAL", "TEMPORARY", "IMPOUND"];
    return types[index % types.length];
  };

  const carData = [
    { make: "MERCEDES-BENZ S 580 L AMG", year: "2023", color: "Black", reg: "PG23JDO", premium: "£434.46", expires: "5 Nov 2025" },
    { make: "FORD FIESTA 1.25 PETROL", year: "2021", color: "White", reg: "BN21TYP", premium: "£15.99", expires: "12 Dec 2024" },
    { make: "VAUXHALL CORSA E", year: "2020", color: "Red", reg: "JL70KWM", premium: "£120.00", expires: "15 Jan 2025" },
  ];

  const PolicyIcon = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M 79.500 37.583 C 77.850 37.811, 71.430 38.503, 65.234 39.120 L 53.968 40.242 49.579 45.123 C 47.150 47.825, 43.894 53.111, 42.285 56.964 C 39.427 63.811, 39.351 63.891, 37.617 61.865 C 36.032 60.015, 34.943 59.842, 26.844 60.153 C 18.116 60.489, 17.743 60.602, 14.917 63.766 C 10.645 68.548, 10.823 74.023, 15.400 78.600 C 17.270 80.470, 19.608 82, 20.596 82 C 22.039 82, 21.761 82.651, 19.179 85.315 C 17.412 87.138, 15.524 90.173, 14.983 92.058 C 13.595 96.898, 13.701 153.843, 15.105 157.872 C 15.713 159.616, 17.033 161.483, 18.039 162.021 C 19.045 162.559, 24.995 163, 31.260 163 C 41.874 163, 42.800 162.842, 44.826 160.686 C 46.532 158.870, 47 157.147, 47 152.686 L 47 147 99.500 147 L 152 147 152 150.935 C 152 155.700, 153.481 159.883, 155.789 161.637 C 156.958 162.525, 161.167 162.946, 169.076 162.968 C 180.243 162.999, 180.737 162.909, 183.076 160.421 L 185.500 157.842 185.814 129.171 C 186.204 93.605, 185.939 91.045, 181.336 85.950 L 177.838 82.079 180.422 81.430 C 184.457 80.417, 188 75.513, 188 70.939 C 188 68.035, 187.251 66.193, 185.083 63.766 C 182.234 60.575, 181.948 60.492, 172.705 60.158 C 163.756 59.834, 163.155 59.941, 161.621 62.130 C 160.670 63.488, 160 63.867, 160 63.047 C 160 60.109, 152.762 47.176, 149.214 43.775 C 145.772 40.475, 144.805 40.128, 136 39.035 C 126.518 37.858, 85.184 36.795, 79.500 37.583 M 68.531 45.525 C 55.136 46.978, 55.044 47.034, 50.263 56.468 C 48.177 60.584, 44 71.381, 44 72.657 C 44 72.845, 69.200 73, 100 73 C 130.800 73, 156 72.845, 156 72.657 C 156 71.381, 151.823 60.584, 149.737 56.468 C 144.956 47.034, 144.864 46.978, 131.469 45.525 C 120.571 44.396, 79.429 44.396, 68.531 45.525" fill="currentColor"/>
    </svg>
  );

  return (
    <div className={`${styles.section} ${theme === "expired" ? styles.expiredSection : ""}`}>
      {showTitle && (
        <h3 className={`${styles.sectionTitle} ${theme === "expired" ? styles.expiredTitle : ""}`}>
          {title}
        </h3>
      )}
      <div className={styles.cardsGrid}>
        {data.map((row, index) => {
          const car = carData[index % carData.length];
          const statusType = getStatusColor(row.remaining);
          const policyType = getPolicyType(index);

          return (
            <div
              key={index}
              className={`${styles.policyCard} ${styles[`policy${policyType}`]}`}
              onClick={() => {
                showLoading();
                router.push(`/dashboard/policy/${getMockPolicyId(index)}`);
              }}
            >
              {/* Card Header - Logo Badge & Status */}
              <div className={styles.policyCardHeader}>
                <div className={styles.policyBadgeWrapper}>
                  <div className={styles.brandedBadge}>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2F5f655402e5e54b5782ffee63c1df405c?format=png&width=800"
                      alt="Limitless Cover"
                      className={styles.policyLogo}
                    />
                    <span className={styles.policyBadgeType}>{getPolicyType(index)}</span>
                  </div>
                </div>
                <div className={styles.policyStatusWrapper}>
                  <span className={styles.policyStatusLabel}>Status:</span>
                  <span className={`${styles.policyStatus} ${styles[statusType]}`}>
                    {statusType === "expired" ? "Expired" : "Active"}
                  </span>
                </div>
              </div>

              {/* Car Details */}
              <div className={styles.policyCardBody}>
                <div className={styles.licensePlate}>
                  <span className={styles.licensePlateText}>{formatVehicleReg(car.reg)}</span>
                </div>
                <h3 className={styles.vehicleName}>{car.make}</h3>
                <p className={styles.carMeta}>{car.year} • {car.color}</p>
              </div>

              {/* Info Section with Premium, Expiry and Arrow */}
              <div className={styles.policyCardInfo}>
                <div className={styles.infoColumn}>
                  <span className={styles.infoLabel}>Premium</span>
                  <span className={styles.infoValue}>{car.premium}</span>
                </div>
                <div className={styles.infoColumn}>
                  <span className={styles.infoLabel}>Expires</span>
                  <span className={styles.infoValue}>{car.expires}</span>
                </div>
                <div className={styles.policyArrow}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
