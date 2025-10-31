import React from "react";
import styles from "./vehicleDetails.module.css";
import VehicleCovered from "@/app/payment/_components/vehicleCovered/VehicleCovered";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import Duration from "@/app/payment/_components/duration/Duration";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";

const VehicleDetails = ({ data, carUsage, insuranceType }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ComponentWrapper title="Vehicle Details" icon={{ width: 62, height: 62 }} isPaymentPage={true}>
      <div className={styles.content}>
        <VehicleCovered data={data} hideIcon={true} />
        <div className={styles.vehicleInfoSection}>
          <h3 className={styles.sectionTitle}>Vehicle Specification</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              <InputWithData2
                item={{
                  label: "Vehicle Type",
                  value: data?.type || "N/A",
                }}
              />
              <InputWithData2
                item={{
                  label: "Fuel Type",
                  value: data?.fuel || "N/A",
                }}
              />
              <InputWithData2
                item={{
                  label: "Colour",
                  value: data?.colour || "N/A",
                }}
              />
            </div>
            <div className={styles.row}>
              <InputWithData2
                item={{
                  label: "Transmission",
                  value: data?.transmission || "N/A",
                }}
              />
              <InputWithData2
                item={{
                  label: "Doors",
                  value: data?.doors || "N/A",
                }}
              />
              <InputWithData2
                item={{
                  label: "Voluntary Excess",
                  value: carUsage?.voluntaryExcess || "N/A",
                }}
              />
            </div>
          </div>
        </div>
        {insuranceType === "Annual" && (
          <>
            <div className={styles.vehicleInfoSection}>
              <h3 className={styles.sectionTitle}>Vehicle Worth & Purchase Details</h3>
              <div className={styles.sectionContent}>
                <div className={styles.row}>
                  <InputWithData2
                    item={{
                      label: "Vehicle Worth",
                      value: data?.worth || "N/A",
                    }}
                  />
                  <InputWithData2
                    item={{
                      label: "Purchase Date",
                      value: formatDate(data?.purchaseDate),
                    }}
                  />
                  <InputWithData2
                    item={{
                      label: "Legal Owner",
                      value: data?.legalOwner || "N/A",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={styles.vehicleInfoSection}>
              <h3 className={styles.sectionTitle}>Safety & Security Features</h3>
              <div className={styles.sectionContent}>
                <div className={styles.row}>
                  <InputWithData2
                    item={{
                      label: "Tracking Device",
                      value: data?.trackingDevice || "N/A",
                    }}
                  />
                  <InputWithData2
                    item={{
                      label: "Alarm / Immobiliser",
                      value: data?.alarmImmobiliser || "N/A",
                    }}
                  />
                  <InputWithData2
                    item={{
                      label: "Imported Vehicle",
                      value: data?.importedVehicle || "N/A",
                    }}
                  />
                </div>
                <div className={styles.row}>
                  <InputWithData2
                    item={{
                      label: "Vehicle Modified",
                      value: data?.vehicleModified || "N/A",
                    }}
                  />
                  {data?.vehicleModifications && data?.vehicleModifications.length > 0 && (
                    <InputWithData2
                      item={{
                        label: "Modifications",
                        value: data?.vehicleModifications.join(", "),
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {(insuranceType === "Temp" || insuranceType === "Impound") && (
          <div className={styles.vehicleInfoSection}>
            <h3 className={styles.sectionTitle}>Additional Details</h3>
            <div className={styles.sectionContent}>
              <InputWithData2
                item={{
                  label: "Vehicle Worth",
                  value: data?.worth || "N/A",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </ComponentWrapper>
  );
};

export default VehicleDetails;
