import React from "react";
import styles from "./personalDetails.module.css";
import SelectedItem from "../selectedItem/SelectedItem";
import CarUsage from "../carUsage/CarUsage";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";

const PersonalDetails = ({ data, carUsage }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ComponentWrapper title="Personal Details" icon={{width: 62, height: 62}} isPaymentPage={true}>
      <div className={styles.content}>
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
      <CarUsage carUsage={carUsage}/>
    </ComponentWrapper>
  );
};

export default PersonalDetails;
