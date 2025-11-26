"use client";
import React, { useState } from "react";
import styles from "./step3CarOwner.module.css";

const Step3AdditionalProducts = ({
  onBack = () => {},
  onNext = () => {},
  productsData = null
}) => {
  const [formData, setFormData] = useState(productsData || {
    personalAccidentCover: "",
    courtesyCar: "",
    breakdownCover: "",
    motorLegalProtection: ""
  });

  const [errors, setErrors] = useState({});
  const [expandedPersonalAccident, setExpandedPersonalAccident] = useState(false);
  const [expandedCourtesyCar, setExpandedCourtesyCar] = useState(false);
  const [expandedBreakdown, setExpandedBreakdown] = useState(false);
  const [expandedBreakdownOptions, setExpandedBreakdownOptions] = useState(false);
  const [expandedMotorLegal, setExpandedMotorLegal] = useState(false);
  const [expandedMotorLegalDetails, setExpandedMotorLegalDetails] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.personalAccidentCover) newErrors.personalAccidentCover = "Please select an option";
    if (!formData.courtesyCar) newErrors.courtesyCar = "Please select an option";
    if (!formData.breakdownCover) newErrors.breakdownCover = "Please select an option";
    if (!formData.motorLegalProtection) newErrors.motorLegalProtection = "Please select an option";
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

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your policy - Additional products</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Want extra cover info box */}
        <div style={{
          padding: '2rem',
          backgroundColor: '#e8f4ff',
          border: '2px solid #0388ff',
          borderRadius: '10px',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#0052a3',
            margin: '0 0 0.8rem 0'
          }}>Want extra cover?</h3>
          <p style={{
            fontSize: '1.3rem',
            color: '#1a1a2e',
            margin: '0',
            lineHeight: '1.6'
          }}>
            You can add as many extras as you need, however you may see fewer quotes. Please make sure you're not already covered from a policy you've purchased elsewhere.
          </p>
        </div>

        {/* Personal Accident Cover */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Would you like personal accident cover?</h3>
            <p className={styles.subText}>
              Financial help can be provided for you or your family in the event of an accident resulting in serious injury or death.
            </p>
          </div>

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedPersonalAccident(!expandedPersonalAccident)}
          >
            <span className={`${styles.expandableIcon} ${expandedPersonalAccident ? styles.expandedIcon : ''}`}>▼</span>
            What's covered?
          </button>

          {expandedPersonalAccident && (
            <div className={styles.expandableContent}>
              Personal accident cover provides financial assistance to you or your family if you or your passengers suffer serious injury or death as a result of an accident involving the insured vehicle.
            </div>
          )}

          <div className={styles.radioGroup}>
            {["Yes", "I'll decide later"].map((option) => (
              <label key={option} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.6rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="personalAccidentCover"
                  value={option}
                  checked={formData.personalAccidentCover === option}
                  onChange={(e) => setFormData({ ...formData, personalAccidentCover: e.target.value })}
                  className={styles.radioInput}
                  style={{
                    marginTop: '0.3rem',
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    minWidth: '20px',
                    minHeight: '20px'
                  }}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.personalAccidentCover && <span className={styles.error}>{errors.personalAccidentCover}</span>}
        </div>

        {/* Courtesy Car */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Would you like a courtesy car?</h3>
            <p className={styles.subText}>
              You get a courtesy car while your car is being repaired, subject to availability. Cover levels can vary depending on insurance provider.
            </p>
          </div>

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedCourtesyCar(!expandedCourtesyCar)}
          >
            <span className={`${styles.expandableIcon} ${expandedCourtesyCar ? styles.expandedIcon : ''}`}>▼</span>
            What if I need a replacement car?
          </button>

          {expandedCourtesyCar && (
            <div className={styles.expandableContent}>
              A replacement car service may be available as an alternative if a courtesy car isn't available. This provides you with alternative transport while your vehicle is being repaired.
            </div>
          )}

          <div className={styles.radioGroup}>
            {["Yes", "I'll decide later"].map((option) => (
              <label key={option} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.6rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="courtesyCar"
                  value={option}
                  checked={formData.courtesyCar === option}
                  onChange={(e) => setFormData({ ...formData, courtesyCar: e.target.value })}
                  className={styles.radioInput}
                  style={{
                    marginTop: '0.3rem',
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    minWidth: '20px',
                    minHeight: '20px'
                  }}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.courtesyCar && <span className={styles.error}>{errors.courtesyCar}</span>}
        </div>

        {/* Breakdown Cover */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Would you like breakdown cover?</h3>
            <p className={styles.subText}>
              If you've broken down, this cover guarantees roadside assistance as a minimum. Please check with your insurance provider to see what's included.
            </p>
          </div>

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedBreakdownOptions(!expandedBreakdownOptions)}
          >
            <span className={`${styles.expandableIcon} ${expandedBreakdownOptions ? styles.expandedIcon : ''}`}>▼</span>
            What are my breakdown cover options?
          </button>

          {expandedBreakdownOptions && (
            <div className={styles.expandableContent}>
              <p style={{ marginTop: '0' }}>You can usually upgrade your breakdown cover at any time with your insurance provider if you want to add extras such as home starting services, European breakdown cover and more. Compare the Market also offers a stand-alone Breakdown Cover comparison service.</p>
              <p style={{ marginBottom: '0' }}>Check you don't already have breakdown cover elsewhere, e.g. as part of a bank account package.</p>
            </div>
          )}

          <div className={styles.radioGroup}>
            {["Yes", "I'll decide later"].map((option) => (
              <label key={option} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.6rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="breakdownCover"
                  value={option}
                  checked={formData.breakdownCover === option}
                  onChange={(e) => setFormData({ ...formData, breakdownCover: e.target.value })}
                  className={styles.radioInput}
                  style={{
                    marginTop: '0.3rem',
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    minWidth: '20px',
                    minHeight: '20px'
                  }}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.breakdownCover && <span className={styles.error}>{errors.breakdownCover}</span>}

          {/* Warning box about breakdown cover */}
          <div style={{
            padding: '1.2rem',
            backgroundColor: '#fffaed',
            border: '2px solid #fbbf24',
            borderRadius: '8px',
            marginTop: '1.6rem'
          }}>
            <p style={{
              fontSize: '1.3rem',
              color: '#1a1a2e',
              margin: '0',
              lineHeight: '1.6'
            }}>
              Check you don't already have breakdown cover elsewhere, e.g. as part of a bank account package.
            </p>
          </div>
        </div>

        {/* Motor Legal Protection */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Would you like motor legal protection?</h3>
            <p className={styles.subText}>
              If you have an accident that wasn't your fault, you can claim for uninsured losses you might suffer.
            </p>
          </div>

          <button
            type="button"
            className={styles.expandableLink}
            onClick={() => setExpandedMotorLegal(!expandedMotorLegal)}
          >
            <span className={`${styles.expandableIcon} ${expandedMotorLegal ? styles.expandedIcon : ''}`}>▼</span>
            What's covered?
          </button>

          {expandedMotorLegal && (
            <div className={styles.expandableContent}>
              <p style={{ marginTop: '0' }}>Cover varies between providers. You can claim up to a minimum of £50,000 in case of personal injury, excess recovery, loss of earnings, and more.</p>
              <p style={{ marginBottom: '0' }}>This should cover the cost of your legal expenses in pursuit of compensation if there is a reasonable prospect of success against the third party.</p>
            </div>
          )}

          <div className={styles.radioGroup}>
            {["Yes", "I'll decide later"].map((option) => (
              <label key={option} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.6rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="motorLegalProtection"
                  value={option}
                  checked={formData.motorLegalProtection === option}
                  onChange={(e) => setFormData({ ...formData, motorLegalProtection: e.target.value })}
                  className={styles.radioInput}
                  style={{
                    marginTop: '0.3rem',
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    minWidth: '20px',
                    minHeight: '20px'
                  }}
                />
                <span className={styles.radioLabel}>{option}</span>
              </label>
            ))}
          </div>
          {errors.motorLegalProtection && <span className={styles.error}>{errors.motorLegalProtection}</span>}
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

export default Step3AdditionalProducts;
