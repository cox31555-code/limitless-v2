"use client";
import React, { useState } from "react";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import EmploymentAutocomplete from "@/app/annual/get-quote/_components/EmploymentAutocomplete";
import styles from "@/app/annual/get-quote/_components/step2Employment.module.css";
import { occupationOptions, industryOptions, studentTypeOptions } from "@/app/temporary/get-quote/data";

const Step2EmploymentHidden = ({ form }) => {
  const { watch, setValue } = form;
  const [expandedJobTitle, setExpandedJobTitle] = useState(false);
  const [expandedWhyJobTitle, setExpandedWhyJobTitle] = useState(false);
  const [expandedIndustry, setExpandedIndustry] = useState(false);
  const [expandedWhyIndustry, setExpandedWhyIndustry] = useState(false);

  const employmentStatus = watch("userDetails.employmentStatus");
  const occupation = watch("userDetails.occupation");
  const industry = watch("userDetails.industry");
  const studentType = watch("userDetails.studentType");

  const employmentOptions = [
    "Employed",
    "Self Employed",
    "Retired",
    "Unemployed",
    "Student",
    "Houseperson",
  ];

  const isEmployedOrSelfEmployed = ["Employed", "Self Employed"].includes(employmentStatus);
  const isStudent = employmentStatus === "Student";

  const handleEmploymentChange = (value) => {
    setValue("userDetails.employmentStatus", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>What's your employment status?</h3>
          </div>

          <div className={styles.dropdownWrapper}>
            <Dropdown
              selected={employmentStatus || ""}
              options={employmentOptions}
              setSelected={handleEmploymentChange}
              placeholder="Please select..."
            />
          </div>
        </div>

        {isEmployedOrSelfEmployed && (
          <>
            <div className={styles.section}>
              <div className={styles.questionHeader}>
                <h3 className={styles.mainQuestion}>What do you do for a living?</h3>
                <p className={styles.subText}>Start typing and choose from the list.</p>
              </div>

              <div className={styles.dropdownWrapper}>
                <EmploymentAutocomplete
                  selected={occupation || ""}
                  options={occupationOptions}
                  setSelected={(value) => {
                    setValue("userDetails.occupation", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  placeholder="Type your occupation..."
                />
              </div>

              <button
                type="button"
                className={styles.expandableLink}
                onClick={() => setExpandedJobTitle(!expandedJobTitle)}
              >
                <span className={styles.expandableIcon}>
                  {expandedJobTitle ? "▼" : "▼"}
                </span>
                What if my job title isn't listed?
              </button>

              {expandedJobTitle && (
                <div className={styles.expandableContent}>
                  If you can't find your exact job title in the dropdown list, select the closest match or a general category. Our system will use this information to assess your insurance risk appropriately.
                </div>
              )}

              <button
                type="button"
                className={styles.expandableLink}
                onClick={() => setExpandedWhyJobTitle(!expandedWhyJobTitle)}
              >
                <span className={styles.expandableIcon}>
                  {expandedWhyJobTitle ? "▼" : "▼"}
                </span>
                Why are we asking?
              </button>

              {expandedWhyJobTitle && (
                <div className={styles.expandableContent}>
                  Your occupation helps us determine the appropriate insurance premium and coverage for your specific job role and associated risks.
                </div>
              )}
            </div>

            <div className={styles.section}>
              <div className={styles.questionHeader}>
                <h3 className={styles.mainQuestion}>What type of industry do you work in?</h3>
                <p className={styles.subText}>Start typing and choose from the list.</p>
              </div>

              <div className={styles.dropdownWrapper}>
                <EmploymentAutocomplete
                  selected={industry || ""}
                  options={industryOptions}
                  setSelected={(value) => {
                    setValue("userDetails.industry", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  placeholder="Type your industry..."
                />
              </div>

              <button
                type="button"
                className={styles.expandableLink}
                onClick={() => setExpandedIndustry(!expandedIndustry)}
              >
                <span className={styles.expandableIcon}>
                  {expandedIndustry ? "▼" : "▼"}
                </span>
                What if my industry isn't listed?
              </button>

              {expandedIndustry && (
                <div className={styles.expandableContent}>
                  If you can't find your specific industry, choose the closest category. This helps us accurately assess your insurance needs based on your professional sector.
                </div>
              )}

              <button
                type="button"
                className={styles.expandableLink}
                onClick={() => setExpandedWhyIndustry(!expandedWhyIndustry)}
              >
                <span className={styles.expandableIcon}>
                  {expandedWhyIndustry ? "▼" : "▼"}
                </span>
                Why are we asking?
              </button>

              {expandedWhyIndustry && (
                <div className={styles.expandableContent}>
                  Your industry helps us understand your work environment and the associated risks. This information is important for calculating an appropriate insurance premium.
                </div>
              )}
            </div>
          </>
        )}

        {isStudent && (
          <div className={styles.section}>
            <h3 className={styles.mainQuestion}>What type of student are you?</h3>

            <div className={styles.dropdownWrapper}>
              <Dropdown
                selected={studentType || ""}
                options={studentTypeOptions}
                setSelected={(value) => {
                  setValue("userDetails.studentType", value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                placeholder="Please select..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2EmploymentHidden;
