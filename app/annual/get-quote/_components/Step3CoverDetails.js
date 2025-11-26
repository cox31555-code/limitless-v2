"use client";
import React, { useState } from "react";
import styles from "./step3CarOwner.module.css";
import FormDateInput from "@/ui/inputs/FormDateInput";

const Step3CoverDetails = ({
  onBack = () => {},
  onNext = () => {},
  coverData = null
}) => {
  const [formData, setFormData] = useState(coverData || {
    coverLevel: "",
    minimumCoverLevel: "",
    paymentFrequency: "",
    startDate: ""
  });

  const [errors, setErrors] = useState({});
  const [expandedMinimumCover, setExpandedMinimumCover] = useState(false);
  const [expandedStartDate, setExpandedStartDate] = useState(false);
  const [expandedPaymentEffect, setExpandedPaymentEffect] = useState(false);

  const coverLevels = [
    {
      id: "comprehensive",
      title: "Comprehensive cover",
      description: "The full package. Covers: accidental damage, damage caused by fire or theft, loss of your car from theft, accidents caused by you, injuries to other people, and property damage."
    },
    {
      id: "tpft",
      title: "Third Party Fire and Theft (TPFT)",
      description: "Covers damage caused to your car by fire or theft, loss of your car from theft, accidents caused by you, and injuries to other people and property."
    },
    {
      id: "tpo",
      title: "Third Party Only (TPO)",
      description: "Covers claims made by a third party in the event an accident caused by yourself, or any named drivers while using this car. There is no cover for you or your car."
    }
  ];

  const minimumCoverOptions = [
    "None",
    "£50",
    "£100",
    "£150",
    "£200",
    "£250",
    "£300",
    "£350",
    "£400",
    "£450",
    "£500",
    "£600",
    "£700",
    "£800",
    "£900",
    "£1000"
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.coverLevel) newErrors.coverLevel = "Please select a cover level";
    if (formData.coverLevel === "comprehensive" && !formData.minimumCoverLevel) {
      newErrors.minimumCoverLevel = "Please select a minimum level of cover";
    }
    if (!formData.paymentFrequency) newErrors.paymentFrequency = "Please select payment frequency";
    if (!formData.startDate) newErrors.startDate = "Please select a start date";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onNext(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, startDate: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your policy - Your cover</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Cover Level Question */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>What's the minimum level of cover you're looking for?</h3>
          </div>

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedMinimumCover(!expandedMinimumCover)}
          >
            <span className={`${styles.expandableIcon} ${expandedMinimumCover ? styles.expandedIcon : ''}`}>▼</span>
            What does minimum level of cover mean?
          </button>

          {expandedMinimumCover && (
            <div className={styles.expandableContent}>
              Cover levels vary between insurance providers, which means some providers may show you more cover than you need if it's their cheapest price or they can't offer a lower level. Always check you're happy with the level of cover on the provider's website before you buy.
            </div>
          )}

          <div className={styles.radioGroup}>
            {coverLevels.map((level) => (
              <label key={level.id} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.6rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="coverLevel"
                  value={level.id}
                  checked={formData.coverLevel === level.id}
                  onChange={(e) => setFormData({ ...formData, coverLevel: e.target.value })}
                  className={styles.radioInput}
                  style={{
                    marginTop: '0.3rem',
                    flexShrink: 0,
                    width: '24px',
                    height: '24px',
                    minWidth: '24px',
                    minHeight: '24px'
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                  <span className={styles.radioLabel}>{level.title}</span>
                  <span style={{ fontSize: '1.3rem', color: '#6b7c8f', fontWeight: '400', lineHeight: '1.65', marginTop: '-0.2rem' }}>
                    {level.description}
                  </span>
                </div>
              </label>
            ))}
          </div>
          {errors.coverLevel && <span className={styles.error}>{errors.coverLevel}</span>}
        </div>

        {formData.coverLevel === "comprehensive" && (
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>What's the minimum level of cover you're looking for?</h3>
              <p className={styles.subText}>
                The minimum level of cover is the excess amount you'd need to pay towards any claim. A higher minimum level can help reduce your premium, but you should ensure you're comfortable with the amount.
              </p>
            </div>
            <select
              value={formData.minimumCoverLevel || ""}
              onChange={(e) => setFormData({ ...formData, minimumCoverLevel: e.target.value })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                padding: "1.2rem 1.6rem",
                width: "100%",
                boxSizing: "border-box",
                borderRadius: "10px",
                background: "#fff",
                border: "1.5px solid rgba(3, 136, 255, 0.12)",
                height: "5.2rem",
                position: "relative",
                cursor: "pointer",
                transition: "border-color 0.28s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "#1a1a2e",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                appearance: "none",
                backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230388ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1.4rem center",
                backgroundSize: "1.4rem 1.4rem",
                paddingRight: "3.4rem"
              }}
              onFocus={(e) => {
                e.target.style.border = "1.5px solid #0388ff";
                e.target.style.boxShadow = "0 0 0 2px rgba(3, 136, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1.5px solid rgba(3, 136, 255, 0.12)";
                e.target.style.boxShadow = "none";
              }}
            >
              <option value="">Please select...</option>
              {minimumCoverOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.minimumCoverLevel && <span className={styles.error}>{errors.minimumCoverLevel}</span>}

            <details style={{ marginTop: "2rem", listStyle: "none", padding: 0 }}>
              <summary style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                cursor: "pointer",
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "#0052a3",
                textDecoration: "underline",
                padding: 0,
                margin: 0,
                transition: "color 0.2s ease"
              }}>
                How does minimum level of cover affect my quote?
              </summary>
              <div style={{
                marginTop: "1.2rem",
                padding: "1.6rem",
                background: "#f0f6ff",
                borderLeft: "4px solid #0052a3",
                borderRadius: "4px",
                fontSize: "1.3rem",
                color: "#1a1a2e",
                lineHeight: "1.6",
                fontWeight: "400"
              }}>
                Choosing a higher minimum level of cover means you'll pay more towards any claim, which can lower your overall premium. However, you need to ensure you can afford to pay this amount if you make a claim. Different insurance providers may offer different options, and the choice you make here won't affect your eligibility but will influence your final premium price.
              </div>
            </details>
          </div>
        )}

        {/* Payment Frequency Question */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>How do you want to pay for your car insurance?</h3>
            <p className={styles.subText}>
              One annual payment is typically the cheaper option, since paying monthly means you could be entering into a credit agreement and charged interest. Selecting monthly instalments may also reduce the amount of quotes shown.
            </p>
          </div>
          <div className={styles.radioGroup}>
            {["One annual payment", "Monthly instalments"].map((option) => (
              <label key={option} className={styles.radioOption} style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="paymentFrequency"
                  value={option}
                  checked={formData.paymentFrequency === option}
                  onChange={(e) => setFormData({ ...formData, paymentFrequency: e.target.value })}
                  className={styles.radioInput}
                  style={{
                    width: '24px',
                    height: '24px',
                    minWidth: '24px',
                    minHeight: '24px'
                  }}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.paymentFrequency && <span className={styles.error}>{errors.paymentFrequency}</span>}
        </div>

        {/* Start Date Question */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>When, within 30 days, would you like your cover to start?</h3>
            <p className={styles.subText}>
              If you already have a policy, check its expiry date on the renewal notice from your provider to avoid gaps in your cover.
            </p>
          </div>
          <div className={styles.fieldWrapper}>
            <FormDateInput
              type="date"
              dateLabel="Start Date"
              value={formData.startDate || ""}
              onChange={handleDateChange}
              error={errors.startDate}
              minDate={new Date()}
              reducedPadding={true}
            />
            {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
          </div>

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedStartDate(!expandedStartDate)}
          >
            <span className={`${styles.expandableIcon} ${expandedStartDate ? styles.expandedIcon : ''}`}>▼</span>
            What if I don't have a start date yet?
          </button>

          {expandedStartDate && (
            <div className={styles.expandableContent}>
              You can select a start date up to 30 days in the future. If you don't have a specific date in mind, choose the date you'd like your cover to begin, or the earliest date that suits your needs.
            </div>
          )}

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedPaymentEffect(!expandedPaymentEffect)}
          >
            <span className={`${styles.expandableIcon} ${expandedPaymentEffect ? styles.expandedIcon : ''}`}>▼</span>
            How will this affect my quote?
          </button>

          {expandedPaymentEffect && (
            <div className={styles.expandableContent}>
              The start date you select may affect your insurance quote, as premiums can vary depending on when your cover begins. Different seasons and time periods may have different risk profiles, which could impact your final price.
            </div>
          )}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.backBtn} onClick={onBack}>
          Back
        </button>
        <button type="button" className={styles.nextBtn} onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3CoverDetails;
