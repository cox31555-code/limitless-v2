"use client";
import React, { useState, useEffect } from "react";
import styles from "./step3AddDriver.module.css";
import CustomTextInput from "@/ui/inputs/textInput/CustomTextInput";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";

const Step3AddDriver = ({ onBack, onAddDriver, editingDriver = null }) => {
  const [formData, setFormData] = useState({
    relationship: "",
    title: "",
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    relationshipStatus: "",
    livedInUKSinceBirth: "",
    employmentStatus: "",
    licenseType: "",
    licenseIssueCountry: "",
    licenseHeld: "",
    licenseNumber: "",
    otherVehicles: "",
    medicalConditions: "",
    dvlaAwareOfCondition: "",
    insuranceCancelledOrVoided: "",
    criminalConvictions: "",
  });

  const [errors, setErrors] = useState({});
  const [expandedCanQuote, setExpandedCanQuote] = useState(false);
  const [expandedWhyAsk, setExpandedWhyAsk] = useState(false);
  const [expandedUKBirth, setExpandedUKBirth] = useState(false);
  const [expandedLicenseDate, setExpandedLicenseDate] = useState(false);
  const [expandedLicenseShare, setExpandedLicenseShare] = useState(false);
  const [expandedMedical, setExpandedMedical] = useState(false);
  const [expandedSpecialTerms, setExpandedSpecialTerms] = useState(false);
  const [expandedConviction, setExpandedConviction] = useState(false);
  const [expandedConvictionSpent, setExpandedConvictionSpent] = useState(false);

  const relationshipOptions = ["Spouse", "Child", "Parent", "Sibling", "Friend", "Other"];
  const titleOptions = ["Mr", "Mrs", "Miss", "Ms", "Dr", "Mx"];
  const relationshipStatusOptions = ["Single", "Married", "Divorced", "Widowed", "In a civil partnership"];
  const employmentStatusOptions = ["Employed", "Self-employed", "Retired", "Unemployed", "Student", "Houseperson"];
  const licenseTypeOptions = ["Full UK", "Provisional UK", "International", "Other"];
  const licenseCountryOptions = ["UK", "EU/EEA", "Other"];
  const licenseHeldOptions = ["Less than 1 year", "1 year", "2 years", "3 years", "4 years", "5 years", "6 years", "7 years", "8 years", "9 years", "10+ years"];
  const yesNoOptions = ["Yes", "No"];
  const dayOptions = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const monthOptions = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const yearOptions = Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i));

  useEffect(() => {
    if (editingDriver) {
      setFormData(editingDriver);
    }
  }, [editingDriver]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.relationship) newErrors.relationship = "Please select a relationship";
    if (!formData.title) newErrors.title = "Please select a title";
    if (!formData.firstName) newErrors.firstName = "Please enter first name";
    if (!formData.lastName) newErrors.lastName = "Please enter last name";
    if (!formData.day || !formData.month || !formData.year) newErrors.dateOfBirth = "Please enter a valid date of birth";
    if (!formData.relationshipStatus) newErrors.relationshipStatus = "Please select relationship status";
    if (!formData.livedInUKSinceBirth) newErrors.livedInUKSinceBirth = "Please answer this question";
    if (!formData.employmentStatus) newErrors.employmentStatus = "Please select employment status";
    if (!formData.licenseType) newErrors.licenseType = "Please select license type";
    if (!formData.licenseIssueCountry) newErrors.licenseIssueCountry = "Please select license country";
    if (!formData.licenseHeld) newErrors.licenseHeld = "Please select how long held license";
    if (!formData.otherVehicles) newErrors.otherVehicles = "Please answer this question";
    if (!formData.medicalConditions) newErrors.medicalConditions = "Please answer this question";
    if (formData.medicalConditions === "Yes" && !formData.dvlaAwareOfCondition) {
      newErrors.dvlaAwareOfCondition = "Please select DVLA status";
    }
    if (!formData.insuranceCancelledOrVoided) newErrors.insuranceCancelledOrVoided = "Please answer this question";
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

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Add a driver</h2>
      </div>

      <div className={styles.form}>
        <div className={styles.contentWrapper}>
          {/* Relationship Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>What's their relationship to you?</h3>
            <Dropdown
              label=""
              selected={formData.relationship}
              options={relationshipOptions}
              setSelected={(value) => setFormData({ ...formData, relationship: value })}
              placeholder="Please select…"
              error={errors.relationship}
            />
            {errors.relationship && <span className={styles.error}>{errors.relationship}</span>}
          </div>

          {/* Personal Details Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>What's their name?</h3>
            
            <div className={styles.noteBox}>
              <p className={styles.noteText}>If you select 'Dr' or 'Mx' as their title, you may see fewer results. A small number of providers are still updating their systems to support these options. We're working closely with them to ensure complete availability.</p>
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.inputLabel}>Title</label>
                <Dropdown
                  label=""
                  selected={formData.title}
                  options={titleOptions}
                  setSelected={(value) => setFormData({ ...formData, title: value })}
                  placeholder="Select…"
                  error={errors.title}
                />
                {errors.title && <span className={styles.error}>{errors.title}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.inputLabel}>First name</label>
                <CustomTextInput
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  error={errors.firstName}
                />
                {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.inputLabel}>Last name</label>
              <CustomTextInput
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                error={errors.lastName}
              />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </div>
          </div>

          {/* Date of Birth Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>What's their date of birth?</h3>
            
            <button
              type="button"
              className={styles.expandableLink}
              onClick={() => setExpandedCanQuote(!expandedCanQuote)}
            >
              <span className={`${styles.expandableIcon} ${expandedCanQuote ? styles.expandedIcon : ''}`}>▶</span>
              Can I get a quote if they're under 17?
            </button>

            {expandedCanQuote && (
              <div className={styles.expandableContent}>
                Drivers under 17 cannot be added as they're not legally able to drive a motor vehicle on public roads in the UK.
              </div>
            )}

            <div className={styles.dateInputsWrapper}>
              <div className={styles.dateInputGroup}>
                <label className={styles.inputLabel}>Day</label>
                <Dropdown
                  label=""
                  selected={formData.day}
                  options={dayOptions}
                  setSelected={(value) => setFormData({ ...formData, day: value })}
                  placeholder="Day"
                />
              </div>
              <div className={styles.dateInputGroup}>
                <label className={styles.inputLabel}>Month</label>
                <Dropdown
                  label=""
                  selected={formData.month}
                  options={monthOptions}
                  setSelected={(value) => setFormData({ ...formData, month: value })}
                  placeholder="Month"
                />
              </div>
              <div className={styles.dateInputGroup}>
                <label className={styles.inputLabel}>Year</label>
                <Dropdown
                  label=""
                  selected={formData.year}
                  options={yearOptions}
                  setSelected={(value) => setFormData({ ...formData, year: value })}
                  placeholder="Year"
                />
              </div>
            </div>
            {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}
          </div>

          {/* Relationship Status Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>What's their relationship status?</h3>
            <Dropdown
              label=""
              selected={formData.relationshipStatus}
              options={relationshipStatusOptions}
              setSelected={(value) => setFormData({ ...formData, relationshipStatus: value })}
              placeholder="Please select…"
              error={errors.relationshipStatus}
            />
            {errors.relationshipStatus && <span className={styles.error}>{errors.relationshipStatus}</span>}

            <button
              type="button"
              className={styles.expandableLink}
              onClick={() => setExpandedWhyAsk(!expandedWhyAsk)}
            >
              <span className={`${styles.expandableIcon} ${expandedWhyAsk ? styles.expandedIcon : ''}`}>▶</span>
              Why are we asking?
            </button>

            {expandedWhyAsk && (
              <div className={styles.expandableContent}>
                Insurance providers use this information to calculate risk and determine your premium.
              </div>
            )}
          </div>

          {/* UK Since Birth Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>Have they continuously lived in the UK since birth?</h3>
            <p className={styles.sectionDescription}>Insurance providers need to know how long they've lived in the UK on a continuous basis, without any breaks lasting 6 months or longer.</p>
            
            <div className={styles.radioGroup}>
              {yesNoOptions.map((option) => (
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
            <h3 className={styles.questionTitle}>What's their employment status?</h3>
            <Dropdown
              label=""
              selected={formData.employmentStatus}
              options={employmentStatusOptions}
              setSelected={(value) => setFormData({ ...formData, employmentStatus: value })}
              placeholder="Please select…"
              error={errors.employmentStatus}
            />
            {errors.employmentStatus && <span className={styles.error}>{errors.employmentStatus}</span>}
          </div>

          {/* License Type Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>What type of driving licence do they have?</h3>
            <p className={styles.sectionDescription}>Choose the type of licence they'll have at the time this policy starts.</p>
            <Dropdown
              label=""
              selected={formData.licenseType}
              options={licenseTypeOptions}
              setSelected={(value) => setFormData({ ...formData, licenseType: value })}
              placeholder="Please select…"
              error={errors.licenseType}
            />
            {errors.licenseType && <span className={styles.error}>{errors.licenseType}</span>}
          </div>

          {/* License Country Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>Where was their driving licence issued?</h3>
            <p className={styles.sectionDescription}>This won't change the price of your policy.</p>
            <Dropdown
              label=""
              selected={formData.licenseIssueCountry}
              options={licenseCountryOptions}
              setSelected={(value) => setFormData({ ...formData, licenseIssueCountry: value })}
              placeholder="Please select…"
              error={errors.licenseIssueCountry}
            />
            {errors.licenseIssueCountry && <span className={styles.error}>{errors.licenseIssueCountry}</span>}
          </div>

          {/* License Held Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>How long have they held this licence?</h3>
            <p className={styles.sectionDescription}>Round down to the nearest full year they've held their driving licence for. So, if they passed their driving test 6 years and 11 months ago, your answer will be 6 years.</p>
            <Dropdown
              label=""
              selected={formData.licenseHeld}
              options={licenseHeldOptions}
              setSelected={(value) => setFormData({ ...formData, licenseHeld: value })}
              placeholder="Please select…"
              error={errors.licenseHeld}
            />
            {errors.licenseHeld && <span className={styles.error}>{errors.licenseHeld}</span>}

            <button
              type="button"
              className={styles.expandableLink}
              onClick={() => setExpandedLicenseDate(!expandedLicenseDate)}
            >
              <span className={`${styles.expandableIcon} ${expandedLicenseDate ? styles.expandedIcon : ''}`}>▶</span>
              Where can I find the date?
            </button>

            {expandedLicenseDate && (
              <div className={styles.expandableContent}>
                You can find this information on your driving licence card or DVLA records.
              </div>
            )}
          </div>

          {/* License Number Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>Do you want to share their driving licence number?</h3>
            <p className={styles.sectionDescription}>We're unable to accept Isle of Man or Channel Islands driving licence numbers.</p>
            
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.inputLabel}>First 11 characters</label>
                <CustomTextInput
                  placeholder="Optional"
                  value={formData.licenseNumber || ""}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.infoBox}>
              <p className={styles.infoText}>Did you know… you may get a better deal by sharing this with insurers.</p>
            </div>

            <button
              type="button"
              className={styles.expandableLink}
              onClick={() => setExpandedLicenseShare(!expandedLicenseShare)}
            >
              <span className={`${styles.expandableIcon} ${expandedLicenseShare ? styles.expandedIcon : ''}`}>▶</span>
              What do we do with this information?
            </button>

            {expandedLicenseShare && (
              <div className={styles.expandableContent}>
                We share this information with insurance providers to verify your driving history and give you accurate quotes.
              </div>
            )}
          </div>

          {/* Other Vehicles Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>Do they use any other vehicles?</h3>
            <div className={styles.radioGroup}>
              {yesNoOptions.map((option) => (
                <label key={option} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="otherVehicles"
                    value={option}
                    checked={formData.otherVehicles === option}
                    onChange={(e) => setFormData({ ...formData, otherVehicles: e.target.value })}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>
            {errors.otherVehicles && <span className={styles.error}>{errors.otherVehicles}</span>}
          </div>

          {/* Medical Conditions Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>Do they have any medical conditions or disabilities that need to be reported to the DVLA (or DVA)?</h3>
            <p className={styles.sectionDescription}>The DVLA (or DVA) and insurance providers need to know about any medical conditions, disabilities or licence conditions that may affect their ability to drive.</p>
            
            <div className={styles.radioGroup}>
              {yesNoOptions.map((option) => (
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
                <h3 className={styles.questionTitle}>Does the DVLA (or DVA) need to know about their condition?</h3>
                <Dropdown
                  label=""
                  selected={formData.dvlaAwareOfCondition}
                  options={["DVLA aware - No restrictions", "DVLA aware - 1 year restricted", "DVLA aware - 3 year restricted", "DVLA aware - 5 year restricted", "DVLA unaware"]}
                  setSelected={(value) => setFormData({ ...formData, dvlaAwareOfCondition: value })}
                  placeholder="Please select…"
                  error={errors.dvlaAwareOfCondition}
                />
                {errors.dvlaAwareOfCondition && <span className={styles.error}>{errors.dvlaAwareOfCondition}</span>}
              </div>
            )}
          </div>

          {/* Insurance Section */}
          <div className={styles.section}>
            <h3 className={styles.questionTitle}>Has an insurance provider ever declined, cancelled, or voided their policy or imposed special terms?</h3>
            <div className={styles.radioGroup}>
              {yesNoOptions.map((option) => (
                <label key={option} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="insuranceCancelledOrVoided"
                    value={option}
                    checked={formData.insuranceCancelledOrVoided === option}
                    onChange={(e) => setFormData({ ...formData, insuranceCancelledOrVoided: e.target.value })}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioLabel}>{option}</span>
                </label>
              ))}
            </div>
            {errors.insuranceCancelledOrVoided && <span className={styles.error}>{errors.insuranceCancelledOrVoided}</span>}

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
            <h3 className={styles.questionTitle}>Have they got any unspent non-motoring-related criminal convictions?</h3>
            <div className={styles.radioGroup}>
              {yesNoOptions.map((option) => (
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
