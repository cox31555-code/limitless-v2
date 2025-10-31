import React from "react";
import styles from "./personalDetails.module.css";
import SelectedItem from "../selectedItem/SelectedItem";
import CarUsage from "../carUsage/CarUsage";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";

const PersonalDetails = ({ data, carUsage, insuranceType, optionalExtras }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatBoolValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    return value === true ? "Yes" : "No";
  };

  return (
    <ComponentWrapper title="Personal Details" icon={{width: 62, height: 62}} isPaymentPage={true}>
      <div className={styles.sectionsWrapper}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
        <div className={styles.sectionContent}>
          <div className={styles.row}>
          <InputWithData2
            item={{
              label: "First Name",
              value: data?.firstName || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Surname",
              value: data?.surname || "N/A",
            }}
          />{" "}
          <InputWithData2
            item={{
              label: "Date of Birth",
              value: formatDate(data?.dateOfBirth) || "N/A",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Email Address",
              value: data?.email || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Contact Number",
              value: data?.phone || "N/A",
            }}
          />
        </div>
        <InputWithData2
          item={{
            label: "Post Code",
            value: data?.postCode || "N/A",
          }}
        />
        <InputWithData2
          item={{
            label: "Selected Address",
            value: data?.address || "N/A",
          }}
        />
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Employment Status",
              value: data?.employmentStatus || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Occupation",
              value: data?.occupation || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Industry",
              value: data?.industry || "N/A",
            }}
          />
          </div>
          </div>
        </div>
      </div>
      <div className={styles.selections}>
        <SelectedItem
          item={carUsage?.keepingCarDuringDay}
          title="Where do you keep your car during the day?"
          description="You can find the 'acquired vehicle on date in the V5C registration document, also known as the log book."
          img="/svg/day.svg"
        />

        <SelectedItem
          item={carUsage?.keepingCarDuringNight}
          title="Where do you keep your car during the night?"
          description="You can find the 'acquired vehicle on date in the V5C registration document, also known as the log book."
          img="/svg/night.svg"
        />
      </div>
      {(insuranceType === "Temp" || insuranceType === "Impound") && (
        <div style={{marginTop: '2rem'}}>
          <ComponentWrapper title="Car Usage" isPaymentPage={true}>
            <CarUsage carUsage={carUsage}/>
          </ComponentWrapper>
        </div>
      )}
      {insuranceType === "Annual" && (
        <>
          <div style={{marginTop: '2rem'}}>
            <ComponentWrapper title="Car Usage" isPaymentPage={true}>
            <div className={styles.sectionsWrapper}>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Additional Information</h3>
                <div className={styles.sectionContent}>
                  <div className={styles.row}>
                    <InputWithData2
                      item={{
                        label: "Own Your Home",
                        value: formatBoolValue(carUsage?.ownsHome),
                      }}
                    />
                    <InputWithData2
                      item={{
                        label: "Children Under 16",
                        value: formatBoolValue(carUsage?.childrenUnder16),
                      }}
                    />
                    <InputWithData2
                      item={{
                        label: "Lived in UK Since Birth",
                        value: formatBoolValue(carUsage?.livedInUKSinceBirth),
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Car Usage & License</h3>
                <div className={styles.sectionContent}>
                  <div className={styles.row}>
                    <InputWithData2
                      item={{
                        label: "What do you use the car for?",
                        value: carUsage?.usageType || "N/A",
                      }}
                    />
                    <InputWithData2
                      item={{
                        label: "License Type",
                        value: carUsage?.licenseType || "N/A",
                      }}
                    />
                    <InputWithData2
                      item={{
                        label: "License Held Since",
                        value: carUsage?.licenseHeld || "N/A",
                      }}
                    />
                  </div>
                  <div className={styles.row}>
                    <InputWithData2
                      item={{
                        label: "License Number",
                        value: carUsage?.licenseNumber || "N/A",
                      }}
                    />
                    <InputWithData2
                      item={{
                        label: "No Claims Bonus",
                        value: carUsage?.NCB || "N/A",
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
            </div>
          </ComponentWrapper>
          </div>
          <div style={{marginTop: '2rem'}}>
            <ComponentWrapper title="Declarations" isPaymentPage={true}>
            <div className={styles.sectionsWrapper}>
              <div className={styles.section}>
                <div className={styles.sectionContent}>
                  <div className={styles.row}>
                    <InputWithData2
                      item={{
                        label: "Criminal Convictions",
                        value: formatBoolValue(carUsage?.criminalConvictions),
                      }}
                    />
                    <InputWithData2
                      item={{
                        label: "Medical Conditions",
                        value: formatBoolValue(carUsage?.medicalConditions),
                      }}
                    />
                    <InputWithData2
                      item={{
                        label: "Insurance Cancelled/Refused",
                        value: formatBoolValue(carUsage?.insuranceCancelledOrClaimRefusedOrPolicyVoided),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ComponentWrapper>
          </div>
          {optionalExtras && (
            <div style={{marginTop: '2rem'}}>
              <ComponentWrapper title="Optional Extras" isPaymentPage={true}>
              <div className={styles.sectionsWrapper}>
                <div className={styles.section}>
                  <div className={styles.sectionContent}>
                    <div className={styles.row}>
                      <InputWithData2 item={{ label: "Courtesy Car", value: optionalExtras?.courtesyCar ? "Yes" : "No" }} />
                      <InputWithData2 item={{ label: "Breakdown Cover", value: optionalExtras?.breakdownCover ? "Yes" : "No" }} />
                      <InputWithData2 item={{ label: "Foreign Use Cover", value: optionalExtras?.foreignUseCover ? "Yes" : "No" }} />
                    </div>
                  </div>
                </div>
              </div>
            </ComponentWrapper>
            </div>
          )}
          {carUsage?.additionalDrivers && carUsage?.additionalDrivers.length > 0 && (
            <div style={{marginTop: '2rem'}}>
              <ComponentWrapper title="Additional Drivers" isPaymentPage={true}>
              <div className={styles.sectionsWrapper}>
                <div className={styles.section}>
                  <div className={styles.sectionContent}>
                    {carUsage.additionalDrivers.map((driver, index) => (
                      <div key={index} className={styles.driverBlock}>
                        <div className={styles.row}>
                          <InputWithData2 item={{ label: `Driver ${index + 1} - First Name`, value: driver?.firstName || "N/A" }} />
                          <InputWithData2 item={{ label: "Surname", value: driver?.surname || "N/A" }} />
                          <InputWithData2 item={{ label: "Date of Birth", value: formatDate(driver?.dateOfBirth) || "N/A" }} />
                        </div>
                        <div className={styles.row}>
                          <InputWithData2 item={{ label: "Employment Status", value: driver?.employmentStatus || "N/A" }} />
                          <InputWithData2 item={{ label: "Occupation", value: driver?.occupation || "N/A" }} />
                          <InputWithData2 item={{ label: "Industry", value: driver?.industry || "N/A" }} />
                        </div>
                        <div className={styles.row}>
                          <InputWithData2 item={{ label: "Uses Other Vehicles", value: driver?.otherVehicles ? "Yes" : "No" }} />
                          <InputWithData2 item={{ label: "License Type", value: driver?.licenseType || "N/A" }} />
                          <InputWithData2 item={{ label: "License Held Since", value: driver?.licenseHeld || "N/A" }} />
                        </div>
                        <div className={styles.row}>
                          <InputWithData2 item={{ label: "No Claims Bonus", value: driver?.NCB || "N/A" }} />
                          <InputWithData2 item={{ label: "Criminal Convictions", value: formatBoolValue(driver?.criminalConvictions) }} />
                          <InputWithData2 item={{ label: "Medical Conditions", value: formatBoolValue(driver?.medicalConditions) }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ComponentWrapper>
            </div>
          )}
        </>
      )}
    </ComponentWrapper>
  );
};

export default PersonalDetails;
