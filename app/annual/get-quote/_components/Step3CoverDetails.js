"use client";
import React, { useState } from "react";
import styles from "./step3CarOwner.module.css";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import FormDateInput from "@/ui/inputs/FormDateInput";

const Step3CoverDetails = ({
  onBack = () => {},
  onNext = () => {},
  coverData = null,
  showCoverOptions = true
}) => {
  const [formData, setFormData] = useState(coverData || {
    coverLevel: "",
    minimumCoverLevel: "",
    paymentFrequency: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: ""
  });

  const [errors, setErrors] = useState({});
  const [expandedMinimumCover, setExpandedMinimumCover] = useState(false);
  const [expandedStartDate, setExpandedStartDate] = useState(false);
  const [expandedPaymentEffect, setExpandedPaymentEffect] = useState(false);

  // Generate date options for next 30 days
  const generateDateOptions = () => {
    const options = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });
      const dayNum = date.getDate();
      const monthName = date.toLocaleDateString('en-GB', { month: 'long' });
      const year = date.getFullYear();

      const displayLabel = `${dayName}, ${dayNum} ${monthName} ${year}`;
      const dateValue = date.toISOString().split('T')[0]; // YYYY-MM-DD format

      options.push(displayLabel);
    }

    return options;
  };

  const dateOptions = generateDateOptions();

  // Get the display label for the selected date
  const getSelectedDateLabel = () => {
    if (!formData.startDate) return "";
    const selectedDate = new Date(formData.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysFromToday = Math.floor((selectedDate - today) / (1000 * 60 * 60 * 24));

    if (daysFromToday >= 0 && daysFromToday < dateOptions.length) {
      return dateOptions[daysFromToday];
    }
    return "";
  };

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
    if (showCoverOptions) {
      if (!formData.coverLevel) newErrors.coverLevel = "Please select a cover level";
      if (formData.coverLevel === "comprehensive" && !formData.minimumCoverLevel) {
        newErrors.minimumCoverLevel = "Please select a minimum level of cover";
      }
      if (!formData.paymentFrequency) newErrors.paymentFrequency = "Please select payment frequency";
    }
    if (!formData.startDate) newErrors.startDate = "Please select a start date";
    if (!showCoverOptions) {
      if (!formData.startTime) newErrors.startTime = "Please select a start time";
      if (!formData.endDate) newErrors.endDate = "Please select an end date";
      if (!formData.endTime) newErrors.endTime = "Please select an end time";
    }
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
        <h2 className={styles.stepTitleText}>Your policy - Your cover</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Cover Level Question */}
        {showCoverOptions && (
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
        )}

        {showCoverOptions && formData.coverLevel === "comprehensive" && (
          <div className={styles.section}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>What's the maximum voluntary excess you'd like on this policy?</h3>
              <p className={styles.subText}>
                Voluntary excess is the amount you're willing to pay on top of the compulsory excess. Compulsory excess varies between insurance providers. If you're a new driver, insurance providers may also apply young or inexperienced driver excess.
              </p>
            </div>

            <button
              type="button"
              className={styles.expandableLink}
              onClick={() => setExpandedPaymentEffect(!expandedPaymentEffect)}
            >
              <span className={`${styles.expandableIcon} ${expandedPaymentEffect ? styles.expandedIcon : ''}`}>▼</span>
              How does voluntary excess affect my quote?
            </button>

            {expandedPaymentEffect && (
              <div className={styles.expandableContent}>
                Choosing a higher voluntary excess may lower your premium, but make sure you're comfortable paying both the voluntary and compulsory excess amount in the event of a claim. You may find that some insurance providers quote with a lower voluntary excess than you've chosen. This won't affect the price of your policy but may save you money in the event of a claim.
              </div>
            )}

            <Dropdown
              label=""
              selected={formData.minimumCoverLevel || ""}
              options={minimumCoverOptions}
              setSelected={(value) => setFormData({ ...formData, minimumCoverLevel: value })}
              placeholder="Please select…"
            />
            {errors.minimumCoverLevel && <span className={styles.error}>{errors.minimumCoverLevel}</span>}
          </div>
        )}

        {/* Payment Frequency Question */}
        {showCoverOptions && (
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
        )}

        {/* Start Date Question */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>When, within 30 days, would you like your cover to start?</h3>
            <p className={styles.subText}>
              If you already have a policy, check its expiry date on the renewal notice from your provider to avoid gaps in your cover.
            </p>
          </div>
          {showCoverOptions ? (
            <div className={styles.fieldWrapper}>
              <Dropdown
                label=""
                selected={getSelectedDateLabel()}
                options={dateOptions}
                setSelected={(value) => {
                  // Find the index of selected date and convert back to YYYY-MM-DD format
                  const selectedIndex = dateOptions.indexOf(value);
                  if (selectedIndex >= 0) {
                    const today = new Date();
                    const selectedDate = new Date(today);
                    selectedDate.setDate(selectedDate.getDate() + selectedIndex);
                    const dateString = selectedDate.toISOString().split('T')[0];
                    setFormData({ ...formData, startDate: dateString });
                  }
                }}
                placeholder="Please select…"
              />
              {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.6rem' }}>
              <FormDateInput
                type="date"
                dateLabel="Date"
                value={formData.startDate || ""}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                error={errors.startDate}
                minDate={new Date()}
                maxDate={(() => {
                  const maxDate = new Date();
                  maxDate.setDate(maxDate.getDate() + 30);
                  return maxDate;
                })()}
              />
              <FormDateInput
                type="time"
                timeLabel="Time"
                value={formData.startTime || ""}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                error={errors.startTime}
                relatedDateValue={formData.startDate}
              />
            </div>
          )}

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

          {showCoverOptions && (
            <>
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
            </>
          )}
        </div>

        {/* End Date Question - Only for temporary insurance (when !showCoverOptions) */}
        {!showCoverOptions && (
          <div className={styles.section} style={{ opacity: formData.startDate && formData.startTime ? 1 : 0.5, pointerEvents: formData.startDate && formData.startTime ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
            <div className={styles.questionHeader}>
              <h3 className={styles.mainQuestion}>When would you like your cover to end?</h3>
              <p className={styles.subText}>
                Select the date and time when your temporary coverage should expire. Minimum 12 hours from start, maximum 30 days.
              </p>
              {(!formData.startDate || !formData.startTime) && (
                <p style={{ color: '#ef4444', fontSize: '1.3rem', marginTop: '1rem', fontWeight: '500' }}>
                  Please select a start date and time first.
                </p>
              )}
            </div>
            {formData.startDate && formData.startTime && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.6rem' }}>
                <FormDateInput
                  type="date"
                  dateLabel="End Date"
                  value={formData.endDate || ""}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  error={errors.endDate}
                  minDate={(() => {
                    const startDate = new Date(formData.startDate);
                    const minDate = new Date(startDate);
                    minDate.setHours(minDate.getHours() + 12);
                    return minDate;
                  })()}
                  maxDate={(() => {
                    const startDate = new Date(formData.startDate);
                    const maxDate = new Date(startDate);
                    maxDate.setDate(maxDate.getDate() + 30);
                    return maxDate;
                  })()}
                />
                <FormDateInput
                  type="time"
                  timeLabel="End Time"
                  value={formData.endTime || ""}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  error={errors.endTime}
                  relatedDateValue={formData.endDate}
                  disabled={!formData.endDate}
                />
              </div>
            )}
          </div>
        )}
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
