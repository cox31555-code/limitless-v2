"use client";
import React, { useState } from "react";
import styles from "./step3AddDriver.module.css";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import EmploymentAutocomplete from "./EmploymentAutocomplete";
import { licenseHeldOptions, monthOptions, yearOptions, additionalQualificationsOptions, occupationOptions, industryOptions, studentTypeOptions } from "@/app/temporary/get-quote/data";

const Step3AddDriver = ({ onBack, onAddDriver, editingDriver = null }) => {
  const [formData, setFormData] = useState(editingDriver || {
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    relationshipStatus: "",
    relationship: "",
    livedInUKSinceBirth: "",
    employmentStatus: "",
    occupation: "",
    industry: "",
    licenseType: "",
    licenseIssueCountry: "",
    licenseHeld: "",
    licenseNumberFirst: "",
    licenseNumberLast: "",
    licenseNumberNI: "",
    declineShareLicenseNumber: false,
    hasAdditionalQualifications: "",
    additionalQualificationType: "",
    qualificationMonth: "",
    qualificationYear: "",
    medicalConditions: "",
    dvlaConditionType: "",
    insuranceCancelledOrClaimRefusedOrPolicyVoided: "",
    criminalConvictions: "",
  });

  const [declineShareLicenseNumber, setDeclineShareLicenseNumber] = useState(editingDriver?.declineShareLicenseNumber || false);

  const [errors, setErrors] = useState({});
  const [expandedUnder17, setExpandedUnder17] = useState(false);
  const [expandedWhereToFind, setExpandedWhereToFind] = useState(false);
  const [expandedWhatDo, setExpandedWhatDo] = useState(false);
  const [expandedJobTitle, setExpandedJobTitle] = useState(false);
  const [expandedWhyJobTitle, setExpandedWhyJobTitle] = useState(false);
  const [expandedIndustry, setExpandedIndustry] = useState(false);
  const [expandedWhyIndustry, setExpandedWhyIndustry] = useState(false);
  const [expandedMedical, setExpandedMedical] = useState(false);
  const [expandedSpecialTerms, setExpandedSpecialTerms] = useState(false);
  const [expandedConviction, setExpandedConviction] = useState(false);
  const [expandedConvictionSpent, setExpandedConvictionSpent] = useState(false);

  const titleOptions = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Prof"];
  const maritalStatusOptions = ["Single", "Married", "Civil partnership", "Divorced", "Widowed"];
  const relationshipOptions = ["Spouse", "Child", "Parent", "Sibling", "Friend", "Other"];
  const employmentOptions = [
    "Employed",
    "Self Employed",
    "Retired",
    "Unemployed",
    "Student",
    "Houseperson",
  ];
  const licenseTypeOptions = [
    "Full UK Car Licence",
    "Provisional UK Car Licence",
    "Full International Licence",
    "Full EU Licence",
    "Full European non-EU Licence",
    "Full UK Car Licence (automatic only)",
  ];
  const licenseIssueCountryOptions = [
    "England, Scotland or Wales (Great Britain)",
    "Northern Ireland",
  ];

  const isEmployedOrSelfEmployed = ["Employed", "Self Employed"].includes(formData.employmentStatus);
  const isStudent = formData.employmentStatus === "Student";

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Please select a title";
    if (!formData.firstName) newErrors.firstName = "Please enter first name";
    if (!formData.lastName) newErrors.lastName = "Please enter last name";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Please enter date of birth";
    if (!formData.relationshipStatus) newErrors.relationshipStatus = "Please select relationship status";
    if (!formData.livedInUKSinceBirth) newErrors.livedInUKSinceBirth = "Please answer this question";
    if (!formData.employmentStatus) newErrors.employmentStatus = "Please select employment status";
    if (isEmployedOrSelfEmployed && !formData.occupation) newErrors.occupation = "Please enter occupation";
    if (isEmployedOrSelfEmployed && !formData.industry) newErrors.industry = "Please enter industry";
    if (isStudent && !formData.occupation) newErrors.occupation = "Please select student type";
    if (!formData.licenseType) newErrors.licenseType = "Please select license type";
    if (!formData.licenseIssueCountry) newErrors.licenseIssueCountry = "Please select where license was issued";
    if (!formData.licenseHeld) newErrors.licenseHeld = "Please select how long held license";
    if (!formData.medicalConditions) newErrors.medicalConditions = "Please answer this question";
    if (formData.medicalConditions === "Yes" && !formData.dvlaConditionType) {
      newErrors.dvlaConditionType = "Please select DVLA status";
    }
    if (!formData.insuranceCancelledOrClaimRefusedOrPolicyVoided) newErrors.insuranceCancelledOrClaimRefusedOrPolicyVoided = "Please answer this question";
    if (!formData.criminalConvictions) newErrors.criminalConvictions = "Please answer this question";

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onAddDriver(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const isNorthernIreland = formData.licenseIssueCountry === "Northern Ireland";
  const isGreatBritain = formData.licenseIssueCountry === "England, Scotland or Wales (Great Britain)";
  const nonUKLicenseTypes = [
    "Full International Licence",
    "Full EU Licence",
    "Full European non-EU Licence",
  ];
  const shouldShowLicenseNumberSection = formData.licenseType && !nonUKLicenseTypes.includes(formData.licenseType);

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Add a driver</h2>
      </div>

      <div className={styles.form}>
        <div className={styles.contentWrapper}>
          {/* Relationship Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>What's their relationship to you?</h3>
            </div>
            <div className={styles.fieldWrapper}>
              <Dropdown
                label=""
                selected={formData.relationship}
                options={relationshipOptions}
                setSelected={(value) => setFormData({ ...formData, relationship: value })}
                placeholder="Please select…"
              />
              {errors.relationship && <span className={styles.error}>{errors.relationship}</span>}
            </div>
          </div>

          {/* Name Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>What's their name?</h3>
              <p className={styles.subText}>
                If you select 'Dr' or 'Prof' as their title, you may see fewer results. A small number of providers are still updating their systems to support these options. We're working closely with them to ensure complete availability.
              </p>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.fieldWrapper}>
                <label className={styles.fieldLabel}>Title</label>
                <Dropdown
                  label=""
                  selected={formData.title}
                  options={titleOptions}
                  setSelected={(value) => setFormData({ ...formData, title: value })}
                  placeholder="Select..."
                />
                {errors.title && <span className={styles.error}>{errors.title}</span>}
              </div>
            </div>

            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>First name</label>
              <CustomTextInput
                type="text"
                placeholder=""
                value={formData.firstName || ""}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                error={errors.firstName}
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>

            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Last name</label>
              <CustomTextInput
                type="text"
                placeholder=""
                value={formData.lastName || ""}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                error={errors.lastName}
              />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </div>
          </div>

          {/* Date of Birth Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>What's their date of birth?</h3>
            </div>

            <button
              type="button"
              className={styles.expandableLink}
              onClick={() => setExpandedUnder17(!expandedUnder17)}
            >
              <span className={`${styles.expandableIcon} ${expandedUnder17 ? styles.expandedIcon : ''}`}>▶</span>
              Can I get a quote if they're under 17?
            </button>

            {expandedUnder17 && (
              <div className={styles.expandableContent}>
                Drivers under 17 cannot be added as they're not legally able to drive a motor vehicle on public roads in the UK.
              </div>
            )}

            <div className={styles.dateInputsWrapper}>
              <div className={styles.dateInputGroup}>
                <label className={styles.inputLabel}>Day</label>
                <CustomTextInput
                  type="text"
                  placeholder="DD"
                  maxLength={2}
                  value={formData.dateOfBirth ? formData.dateOfBirth.split('/')[0] : ""}
                  onChange={(e) => {
                    let day = e.target.value.replace(/[^0-9]/g, '');
                    if (day.length > 2) day = day.slice(0, 2);
                    if (day && (parseInt(day) < 1 || parseInt(day) > 31)) return;
                    const parts = formData.dateOfBirth ? formData.dateOfBirth.split('/') : ['', '', ''];
                    if (day || parts[1] || parts[2]) {
                      setFormData({ ...formData, dateOfBirth: `${day}/${parts[1] || ''}/${parts[2] || ''}` });
                    }
                  }}
                />
              </div>
              <div className={styles.dateInputGroup}>
                <label className={styles.inputLabel}>Month</label>
                <CustomTextInput
                  type="text"
                  placeholder="MM"
                  maxLength={2}
                  value={formData.dateOfBirth ? formData.dateOfBirth.split('/')[1] : ""}
                  onChange={(e) => {
                    let month = e.target.value.replace(/[^0-9]/g, '');
                    if (month.length > 2) month = month.slice(0, 2);
                    if (month && (parseInt(month) < 1 || parseInt(month) > 12)) return;
                    const parts = formData.dateOfBirth ? formData.dateOfBirth.split('/') : ['', '', ''];
                    if (parts[0] || month || parts[2]) {
                      setFormData({ ...formData, dateOfBirth: `${parts[0] || ''}/${month}/${parts[2] || ''}` });
                    }
                  }}
                />
              </div>
              <div className={styles.dateInputGroup}>
                <label className={styles.inputLabel}>Year</label>
                <CustomTextInput
                  type="text"
                  placeholder="YYYY"
                  maxLength={4}
                  value={formData.dateOfBirth ? formData.dateOfBirth.split('/')[2] : ""}
                  onChange={(e) => {
                    let year = e.target.value.replace(/[^0-9]/g, '');
                    if (year.length > 4) year = year.slice(0, 4);
                    const parts = formData.dateOfBirth ? formData.dateOfBirth.split('/') : ['', '', ''];
                    if (parts[0] || parts[1] || year) {
                      setFormData({ ...formData, dateOfBirth: `${parts[0] || ''}/${parts[1] || ''}/${year}` });
                    }
                  }}
                />
              </div>
            </div>
            {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}
          </div>

          {/* Relationship Status Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>What's their relationship status?</h3>
            </div>
            <div className={styles.radioGroup}>
              {maritalStatusOptions.map((option) => (
                <label key={option} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="relationshipStatus"
                    value={option}
                    checked={formData.relationshipStatus === option}
                    onChange={(e) => setFormData({ ...formData, relationshipStatus: e.target.value })}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>
            {errors.relationshipStatus && <span className={styles.error}>{errors.relationshipStatus}</span>}
          </div>

          {/* UK Since Birth Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>Have they continuously lived in the UK since birth?</h3>
              <p className={styles.subText}>Insurance providers need to know how long they've lived in the UK on a continuous basis, without any breaks lasting 6 months or longer.</p>
            </div>
            <div className={styles.radioGroup}>
              {["Yes", "No"].map((option) => (
                <label key={option} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="livedInUKSinceBirth"
                    value={option}
                    checked={formData.livedInUKSinceBirth === option}
                    onChange={(e) => setFormData({ ...formData, livedInUKSinceBirth: e.target.value })}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>
            {errors.livedInUKSinceBirth && <span className={styles.error}>{errors.livedInUKSinceBirth}</span>}
          </div>

          {/* Employment Status Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>What's their employment status?</h3>
            </div>
            <div className={styles.dropdownWrapper}>
              <Dropdown
                label=""
                selected={formData.employmentStatus}
                options={employmentOptions}
                setSelected={(value) => setFormData({ ...formData, employmentStatus: value })}
                placeholder="Please select..."
              />
              {errors.employmentStatus && <span className={styles.error}>{errors.employmentStatus}</span>}
            </div>
          </div>

          {/* Occupation Section - Only for Employed/Self Employed */}
          {isEmployedOrSelfEmployed && (
            <div className={styles.section}>
              <div className={styles.questionHeader}>
                <h3 className={styles.mainQuestion}>What do they do for a living?</h3>
                <p className={styles.subText}>Start typing and choose from the list.</p>
              </div>

              <div className={styles.dropdownWrapper}>
                <EmploymentAutocomplete
                  selected={formData.occupation || ""}
                  options={occupationOptions}
                  setSelected={(value) => setFormData({ ...formData, occupation: value })}
                  placeholder="Type your occupation..."
                />
                {errors.occupation && <span className={styles.error}>{errors.occupation}</span>}
              </div>

              <button
                type="button"
                className={styles.expandableLink}
                onClick={() => setExpandedJobTitle(!expandedJobTitle)}
              >
                <span className={`${styles.expandableIcon} ${expandedJobTitle ? styles.expandedIcon : ''}`}>▶</span>
                What if their job title isn't listed?
              </button>

              {expandedJobTitle && (
                <div className={styles.expandableContent}>
                  If you can't find the exact job title in the dropdown list, select the closest match or a general category. Our system will use this information to assess insurance risk appropriately.
                </div>
              )}

              <button
                type="button"
                className={styles.expandableLink}
                onClick={() => setExpandedWhyJobTitle(!expandedWhyJobTitle)}
              >
                <span className={`${styles.expandableIcon} ${expandedWhyJobTitle ? styles.expandedIcon : ''}`}>▶</span>
                Why are we asking?
              </button>

              {expandedWhyJobTitle && (
                <div className={styles.expandableContent}>
                  Their occupation helps us determine the appropriate insurance premium and coverage for their specific job role and associated risks.
                </div>
              )}
            </div>
          )}

          {/* Industry Section - Only for Employed/Self Employed */}
          {isEmployedOrSelfEmployed && (
            <div className={styles.section}>
              <div className={styles.questionHeader}>
                <h3 className={styles.mainQuestion}>What type of industry do they work in?</h3>
                <p className={styles.subText}>Start typing and choose from the list.</p>
              </div>

              <div className={styles.dropdownWrapper}>
                <EmploymentAutocomplete
                  selected={formData.industry || ""}
                  options={industryOptions}
                  setSelected={(value) => setFormData({ ...formData, industry: value })}
                  placeholder="Type your industry..."
                />
                {errors.industry && <span className={styles.error}>{errors.industry}</span>}
              </div>

              <button
                type="button"
                className={styles.expandableLink}
                onClick={() => setExpandedIndustry(!expandedIndustry)}
              >
                <span className={`${styles.expandableIcon} ${expandedIndustry ? styles.expandedIcon : ''}`}>▶</span>
                What if their industry isn't listed?
              </button>

              {expandedIndustry && (
                <div className={styles.expandableContent}>
                  If you can't find the exact industry in the dropdown list, select the closest match or a general category. Our system will use this information to assess insurance risk appropriately.
                </div>
              )}

              <button
                type="button"
                className={styles.expandableLink}
                onClick={() => setExpandedWhyIndustry(!expandedWhyIndustry)}
              >
                <span className={`${styles.expandableIcon} ${expandedWhyIndustry ? styles.expandedIcon : ''}`}>▶</span>
                Why are we asking?
              </button>

              {expandedWhyIndustry && (
                <div className={styles.expandableContent}>
                  Their industry helps us assess driving patterns, commute risks, and occupational hazards that may affect insurance coverage and pricing.
                </div>
              )}
            </div>
          )}

          {/* Student Type Section - Only for Students */}
          {isStudent && (
            <div className={styles.section}>
              <div className={styles.questionHeader}>
                <h3 className={styles.mainQuestion}>What type of student are they?</h3>
              </div>
              <div className={styles.dropdownWrapper}>
                <Dropdown
                  label=""
                  selected={formData.occupation}
                  options={studentTypeOptions}
                  setSelected={(value) => setFormData({ ...formData, occupation: value })}
                  placeholder="Please select..."
                />
                {errors.occupation && <span className={styles.error}>{errors.occupation}</span>}
              </div>
            </div>
          )}

          {/* License Type Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>What type of driving licence do they have?</h3>
              <p className={styles.subText}>Choose the type of licence they'll have at the time this policy starts.</p>
            </div>
            <div className={styles.radioGroup}>
              {licenseTypeOptions.map((option) => (
                <label key={option} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="licenseType"
                    value={option}
                    checked={formData.licenseType === option}
                    onChange={(e) => setFormData({ ...formData, licenseType: e.target.value })}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>
            {errors.licenseType && <span className={styles.error}>{errors.licenseType}</span>}
          </div>

          {/* License Issue Country Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>Where was their driving licence issued?</h3>
            </div>
            <div className={styles.radioGroup}>
              {licenseIssueCountryOptions.map((option) => (
                <label key={option} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="licenseIssueCountry"
                    value={option}
                    checked={formData.licenseIssueCountry === option}
                    onChange={(e) => setFormData({ ...formData, licenseIssueCountry: e.target.value })}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>
            {errors.licenseIssueCountry && <span className={styles.error}>{errors.licenseIssueCountry}</span>}
          </div>

          {/* License Held Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>How long have they held this licence?</h3>
              <p className={styles.subText}>Round down to the nearest full year they've held their driving licence for. So, if they passed their driving test 6 years and 11 months ago, your answer will be 6 years.</p>
            </div>

            <button
              type="button"
              className={styles.expandableLink}
              onClick={() => setExpandedWhereToFind(!expandedWhereToFind)}
            >
              <span className={`${styles.expandableIcon} ${expandedWhereToFind ? styles.expandedIcon : ''}`}>▶</span>
              Where can I find the date?
            </button>

            {expandedWhereToFind && (
              <div className={styles.expandableContent}>
                You can find this information on your driving licence card or DVLA records. The date of issue or first issue date shows when you first got your license.
              </div>
            )}

            <div className={styles.dropdownWrapper}>
              <Dropdown
                label=""
                selected={formData.licenseHeld}
                options={licenseHeldOptions}
                setSelected={(value) => setFormData({ ...formData, licenseHeld: value })}
                placeholder="Please select..."
              />
              {errors.licenseHeld && <span className={styles.error}>{errors.licenseHeld}</span>}
            </div>
          </div>

          {/* License Number Section */}
          {shouldShowLicenseNumberSection && (
            <div className={styles.section}>
              <div className={styles.questionHeader}>
                <h3 className={styles.mainQuestion}>Do you want to share their driving licence number?</h3>
                <p className={styles.subText}>We're unable to accept Isle of Man or Channel Islands driving licence numbers.</p>
              </div>

              {!declineShareLicenseNumber && (
                <div className={styles.licenseImageContainer}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F058fdd9048ee40f580ca41b569bee55c%2F78e152c1b10b432aa104583a5336f5b1?format=webp&width=800"
                    alt="UK Driving Licence"
                    className={styles.licenseImage}
                  />
                </div>
              )}

              {!declineShareLicenseNumber && isGreatBritain && (
                <div className={styles.licenseNumberFields}>
                  <div className={styles.licenseField}>
                    <label className={styles.licenseFieldLabel}>First 11 characters</label>
                    <CustomTextInput
                      type="text"
                      placeholder=""
                      maxLength="11"
                      value={formData.licenseNumberFirst || ""}
                      onChange={(e) => setFormData({ ...formData, licenseNumberFirst: e.target.value })}
                    />
                  </div>
                  <div className={styles.licenseField}>
                    <label className={styles.licenseFieldLabel}>Last 5 characters</label>
                    <CustomTextInput
                      type="text"
                      placeholder=""
                      maxLength="5"
                      value={formData.licenseNumberLast || ""}
                      onChange={(e) => setFormData({ ...formData, licenseNumberLast: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {!declineShareLicenseNumber && isNorthernIreland && (
                <div className={styles.licenseNumberFields}>
                  <div className={styles.licenseField}>
                    <label className={styles.licenseFieldLabel}>Enter their 8 digit number</label>
                    <CustomTextInput
                      type="text"
                      placeholder=""
                      maxLength="8"
                      value={formData.licenseNumberNI || ""}
                      onChange={(e) => setFormData({ ...formData, licenseNumberNI: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className={styles.checkboxWrapper}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={declineShareLicenseNumber}
                    onChange={(e) => {
                      setDeclineShareLicenseNumber(e.target.checked);
                      setFormData({ ...formData, declineShareLicenseNumber: e.target.checked });
                    }}
                    className={styles.checkbox}
                  />
                  I don't want to/can't provide this
                </label>
              </div>

              {!declineShareLicenseNumber && (
                <>
                  <div className={styles.infoBox}>
                    Did you know... you may get a better deal by sharing this with insurers.
                  </div>

                  <button
                    type="button"
                    className={styles.expandableLink}
                    onClick={() => setExpandedWhatDo(!expandedWhatDo)}
                  >
                    <span className={`${styles.expandableIcon} ${expandedWhatDo ? styles.expandedIcon : ''}`}>▶</span>
                    What do we do with this information?
                  </button>

                  {expandedWhatDo && (
                    <div className={styles.expandableContent}>
                      We use your driving licence information to verify your identity and driving history with the DVLA. This helps us provide you with accurate insurance quotes and ensure you're getting the best possible deal.
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Additional Qualifications Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>Do they have any additional driving qualifications?</h3>
            </div>
            <div className={styles.radioGroup}>
              {["Yes", "No"].map((option) => (
                <label key={option} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="hasAdditionalQualifications"
                    value={option}
                    checked={formData.hasAdditionalQualifications === option}
                    onChange={(e) => setFormData({ ...formData, hasAdditionalQualifications: e.target.value })}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>

            {formData.hasAdditionalQualifications === "Yes" && (
              <div className={styles.qualificationSection}>
                <div className={styles.dropdownWrapper}>
                  <label className={styles.fieldLabel}>What type of driving qualification do you have?</label>
                  <Dropdown
                    label=""
                    selected={formData.additionalQualificationType}
                    options={additionalQualificationsOptions}
                    setSelected={(value) => setFormData({ ...formData, additionalQualificationType: value })}
                    placeholder="Please select..."
                  />
                </div>

                <div className={styles.dateFieldGroup}>
                  <div className={styles.dateField}>
                    <label className={styles.dateFieldLabel}>Month</label>
                    <Dropdown
                      label=""
                      selected={formData.qualificationMonth}
                      options={monthOptions}
                      setSelected={(value) => setFormData({ ...formData, qualificationMonth: value })}
                      placeholder="Please select..."
                    />
                  </div>
                  <div className={styles.dateField}>
                    <label className={styles.dateFieldLabel}>Year</label>
                    <Dropdown
                      label=""
                      selected={formData.qualificationYear}
                      options={yearOptions}
                      setSelected={(value) => setFormData({ ...formData, qualificationYear: value })}
                      placeholder="Please select..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Medical Conditions Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>Do they have any medical conditions or disabilities that need to be reported to the DVLA (or DVA)?</h3>
              <p className={styles.subText}>The DVLA (or DVA) and insurance providers need to know about any medical conditions, disabilities or licence conditions that may affect their ability to drive.</p>
            </div>
            <div className={styles.radioGroup}>
              {["Yes", "No"].map((option) => (
                <label key={option} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="medicalConditions"
                    value={option}
                    checked={formData.medicalConditions === option}
                    onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>
            {errors.medicalConditions && <span className={styles.error}>{errors.medicalConditions}</span>}

            {formData.medicalConditions === "Yes" && (
              <div className={styles.conditionalSection}>
                <div className={styles.fieldWrapper}>
                  <label className={styles.fieldLabel}>Select DVLA status</label>
                  <Dropdown
                    label=""
                    selected={formData.dvlaConditionType}
                    options={[
                      "DVLA aware - No restrictions",
                      "DVLA aware - 1 year restricted Licence",
                      "DVLA aware - 2 year restricted Licence",
                      "DVLA aware - 3 year restricted Licence",
                      "DVLA aware - 5 year restricted Licence",
                      "DVLA unaware"
                    ]}
                    setSelected={(value) => setFormData({ ...formData, dvlaConditionType: value })}
                    placeholder="Please select..."
                  />
                  {errors.dvlaConditionType && <span className={styles.error}>{errors.dvlaConditionType}</span>}
                </div>
              </div>
            )}
          </div>

          {/* Insurance Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>Has an insurance provider ever declined, cancelled, or voided their policy or imposed special terms?</h3>
            </div>
            <div className={styles.radioGroup}>
              {["Yes", "No"].map((option) => (
                <label key={option} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="insuranceCancelledOrClaimRefusedOrPolicyVoided"
                    value={option}
                    checked={formData.insuranceCancelledOrClaimRefusedOrPolicyVoided === option}
                    onChange={(e) => setFormData({ ...formData, insuranceCancelledOrClaimRefusedOrPolicyVoided: e.target.value })}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>
            {errors.insuranceCancelledOrClaimRefusedOrPolicyVoided && <span className={styles.error}>{errors.insuranceCancelledOrClaimRefusedOrPolicyVoided}</span>}

            <button
              type="button"
              className={styles.expandableLink}
              onClick={() => setExpandedSpecialTerms(!expandedSpecialTerms)}
            >
              <span className={`${styles.expandableIcon} ${expandedSpecialTerms ? styles.expandedIcon : ''}`}>▶</span>
              How do I know if they've had special terms imposed?
            </button>

            {expandedSpecialTerms && (
              <div className={styles.expandableContent}>
                Special terms might include additional premiums, restrictions on the vehicle or usage, or specific conditions you must follow.
              </div>
            )}
          </div>

          {/* Criminal Convictions Section */}
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>Have they got any unspent non-motoring-related criminal convictions?</h3>
            </div>
            <div className={styles.radioGroup}>
              {["Yes", "No"].map((option) => (
                <label key={option} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="criminalConvictions"
                    value={option}
                    checked={formData.criminalConvictions === option}
                    onChange={(e) => setFormData({ ...formData, criminalConvictions: e.target.value })}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>
            {errors.criminalConvictions && <span className={styles.error}>{errors.criminalConvictions}</span>}

            <button
              type="button"
              className={styles.expandableLink}
              onClick={() => setExpandedConviction(!expandedConviction)}
            >
              <span className={`${styles.expandableIcon} ${expandedConviction ? styles.expandedIcon : ''}`}>▶</span>
              What's an unspent conviction?
            </button>

            {expandedConviction && (
              <div className={styles.expandableContent}>
                An unspent conviction is one that hasn't been removed from your criminal record yet. The rehabilitation period depends on the offence and sentence.
              </div>
            )}

            <button
              type="button"
              className={styles.expandableLink}
              onClick={() => setExpandedConvictionSpent(!expandedConvictionSpent)}
            >
              <span className={`${styles.expandableIcon} ${expandedConvictionSpent ? styles.expandedIcon : ''}`}>▶</span>
              How do I know if their conviction is spent?
            </button>

            {expandedConvictionSpent && (
              <div className={styles.expandableContent}>
                You can check the rehabilitation periods on the UK government website or speak to Citizens Advice for guidance on whether a conviction is spent.
              </div>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" className={styles.backBtn} onClick={onBack}>
            Back
          </button>
          <button type="button" className={styles.nextBtn} onClick={handleSubmit}>
            Add Driver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3AddDriver;
