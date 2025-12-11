"use client";
import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import ComponentWrapper from "../componentWrapper/ComponentWrapper";
import styles from "./personalDetails.module.css";
import TextInput from "../../inputs/textInput/TextInput";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
import Selection2 from "@/ui/inputs/selections/selection2/Selection2";
import CarUsage from "../carUsage/CarUsage";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";

const DataAndTime = dynamic(() => import("../../inputs/selections/dataAndTime/DataAndTime"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading date picker...</div>,
  ssr: false,
});

const PersonalDetails = () => {
  const [data, setData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    postCode: "",
    address: "",
    employmentStatus: "",
    occupation: "",
    industry: "",
    keepingCarDuringDay: "",
    keepingCarDuringNight: "",
    usageType: "",
    licenseType: "",
    licenseHeld: "",
    NCB: "",
    voluntaryExcess: "",
    criminalConvictions: "",
    medicalConditions: "",
    insuranceCancelledOrClaimRefusedOrPolicyVoided: "",
    insurance: "",
  });
  return (
    <ComponentWrapper title="Personal Details">
      <div className={styles.content}>
        <div className={styles.row}>
          <TextInput
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
          <TextInput
            label="Last Name"
            name="surname"
            placeholder="Enter your last name"
            value={data.surname}
            onChange={(e) => setData({ ...data, surname: e.target.value })}
          />
          <DataAndTime
            data={data}
            setData={setData}
            type="date"
            dateKey="dateOfBirth"
            dateLabel="Date of Birth"
            // timeLabel="Time of Birth"
          />
        </div>
        <div className={styles.row}>
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <TextInput
            label="Contact Number"
            name="phone"
            // type="tel"
            placeholder="Enter your contact number"
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
        </div>
        <div className={styles.row}>
          <TextInput
            label="Postcode"
            name="postCode"
            placeholder="Enter your postcode"
            value={data.postCode}
            onChange={(e) => setData({ ...data, postCode: e.target.value })}
            button={<ConfirmBtn title="Find Address" onClick={() => {}} />}
          />
        </div>
        <div className={styles.row}>
          <TextInput
            label="Address"
            name="address"
            placeholder="Enter your Address"
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            // reg={true}
          />

          <Dropdown
            label="Employment Status"
            options={["Self-Employed", "Employed", "Unemployed", "Retired"]}
            placeholder="Choose Employment Status"
            value={data.employmentStatus}
            onChange={(e) =>
              setData({ ...data, employmentStatus: e.target.value })
            }
          />
        </div>
        <div className={styles.row}>
          <TextInput
            label="Industry"
            name="industry"
            placeholder="Enter your Industry"
          />
          <TextInput
            label="Occupation"
            name="occupation"
            placeholder="Enter your Occupation"
            // reg={true}
          />
        </div>
      </div>
      <div className={styles.selections}>
        <Selection2
          title="Where do you keep your car during the day?"
          description="You can find the 'acquired vehicle on date in the V5C registration document, also known as the log book."
          items={[
            "At home",
            "Office or factory car park",
            "Open public car park",
            // "Private car park",
            "Secure public car park",
            "Street away from home",
          ]}
          img={{ src: "/svg/day.svg", alt: "sun", width: 79, height: 106 }}
          selectedItem={data.keepingCarDuringDay}
          setSelectedItem={(item) =>
            setData({ ...data, keepingCarDuringDay: item })
          }
        />
        <Selection2
          description="You can find the 'acquired vehicle on date in the V5C registration document, also known as the log book."
          title="Where do you keep your car during the night?"
          items={[
            "Drive",
            "Street outside home",
            "Locked garage",
            "Street away from home",
            "Public car park",
            "Work car park",
            "Private property",
          ]}
          img={{ src: "/svg/night.svg", alt: "moon", width: 79, height: 106 }}
          selectedItem={data.keepingCarDuringNight}
          setSelectedItem={(item) =>
            setData({ ...data, keepingCarDuringNight: item })
          }
        />
      </div>

      <CarUsage />
    </ComponentWrapper>
  );
};

export default PersonalDetails;
