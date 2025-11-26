"use client";
import React, { useState } from "react";
import styles from "./step3CarOwner.module.css";

const Step3ContactInformation = ({
  onBack = () => {},
  onNext = () => {},
  contactInformationData = null
}) => {
  const [formData, setFormData] = useState(contactInformationData || {
    email: "",
    telephoneNumber: "",
    contactMethod: [],
    dataUsageConsent: true
  });

  const [errors, setErrors] = useState({});
  const [expandedDataUsage, setExpandedDataUsage] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Please enter an email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.contactMethod || formData.contactMethod.length === 0) {
      newErrors.contactMethod = "Please select at least one contact method";
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

  const handleContactMethodChange = (method) => {
    let updated = [...formData.contactMethod];
    if (updated.includes(method)) {
      updated = updated.filter(m => m !== method);
    } else {
      updated.push(method);
    }
    setFormData({ ...formData, contactMethod: updated });
    if (errors.contactMethod) {
      setErrors({ ...errors, contactMethod: "" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.stepTitle}>
        <h2 className={styles.stepTitleText}>Your policy - Contact information</h2>
      </div>

      <div className={styles.contentWrapper}>
        {/* Email Field */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Email</h3>
            <p className={styles.subText}>
              The insurance provider needs this to send you confirmation of your policy. If you opt-in to receive emails from us, we'll send you those too.
            </p>
          </div>

          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) {
                setErrors({ ...errors, email: "" });
              }
            }}
            placeholder="info@limitlessinsuranceservices.com"
            className={styles.inputField}
            style={{
              width: '100%',
              padding: '1.2rem',
              borderRadius: '8px',
              border: '2px solid #e5e5e5',
              fontSize: '1.3rem',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        {/* Telephone Number Field */}
        <div className={styles.section}>
          <div className={styles.questionHeader}>
            <h3 className={styles.mainQuestion}>Main telephone number (optional)</h3>
          </div>

          <input
            type="tel"
            value={formData.telephoneNumber || ""}
            onChange={(e) => setFormData({ ...formData, telephoneNumber: e.target.value })}
            placeholder=""
            className={styles.inputField}
            style={{
              width: '100%',
              padding: '1.2rem',
              borderRadius: '8px',
              border: '2px solid #e5e5e5',
              fontSize: '1.3rem',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* We'll do the work for you section */}
        <div style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          marginBottom: '2rem',
          marginTop: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1a1a2e',
            margin: '0 0 1rem 0'
          }}>We'll do the work for you</h3>
          
          <div style={{
            fontSize: '1.3rem',
            color: '#1a1a2e',
            lineHeight: '1.6',
            marginBottom: '1rem'
          }}>
            <p style={{ margin: '0 0 1rem 0', fontWeight: '600' }}>Make life simpler.</p>
            <p style={{ margin: '0' }}>We'll send you renewal reminders to help you stay on top of your bills, the latest deals, and more ways to save you money.</p>
          </div>

          <div style={{
            fontSize: '1.3rem',
            color: '#1a1a2e',
            lineHeight: '1.6'
          }}>
            <p style={{ margin: '0 0 1rem 0', fontWeight: '600' }}>We'll also send you...</p>
            <p style={{ margin: '0' }}>The latest on how to claim Meerkat Rewards® like restaurant discounts, and 2 for 1 cinema tickets – plus offers from partners we collaborate with or sponsor.</p>
          </div>
        </div>

        {/* Choose how we contact you */}
        <div className={styles.section}>
          <h3 className={styles.mainQuestion}>Choose how we contact you</h3>

          <div style={{ marginTop: '1.6rem' }}>
            {["Email", "Phone", "Text", "Post", "Do not contact me about the above"].map((method) => (
              <label key={method} style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.6rem', cursor: 'pointer', alignItems: 'flex-start' }}>
                <input
                  type="checkbox"
                  checked={formData.contactMethod.includes(method)}
                  onChange={() => handleContactMethodChange(method)}
                  style={{
                    marginTop: '0.3rem',
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    minWidth: '20px',
                    minHeight: '20px',
                    cursor: 'pointer',
                    accentColor: '#0052a3'
                  }}
                />
                <span style={{
                  fontSize: '1.3rem',
                  color: '#1a1a2e'
                }}>{method}</span>
              </label>
            ))}
          </div>
          {errors.contactMethod && <span className={styles.error}>{errors.contactMethod}</span>}
        </div>

        {/* What else will we contact you about */}
        <div style={{
          borderBottom: '1px solid #e5e5e5',
          paddingBottom: '1.6rem',
          marginBottom: '1.6rem'
        }}>
          <button
            type="button"
            onClick={() => setExpandedDataUsage(!expandedDataUsage)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0',
              cursor: 'pointer',
              display: 'flex',
              gap: '0.8rem',
              alignItems: 'center',
              fontSize: '1.3rem',
              color: '#0052a3',
              textDecoration: 'underline',
              fontWeight: '600'
            }}
          >
            <span style={{
              display: 'inline-block',
              transform: expandedDataUsage ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}>▲</span>
            What else will we contact you about?
          </button>

          {expandedDataUsage && (
            <div style={{
              marginTop: '1.6rem',
              fontSize: '1.3rem',
              color: '#1a1a2e',
              lineHeight: '1.6'
            }}>
              <p>
                We will contact you when necessary, including, but not limited to, the provision of our services. This may include notification of any issues that may affect you, as well as quote confirmations or renewal quotes.
              </p>
            </div>
          )}
        </div>

        {/* Data usage information */}
        <div style={{
          fontSize: '1.3rem',
          color: '#1a1a2e',
          lineHeight: '1.6'
        }}>
          <p style={{ margin: '0 0 1.6rem 0' }}>
            To find out more read our <a href="#" style={{ color: '#0052a3', textDecoration: 'underline' }}>Privacy policy</a> and <a href="#" style={{ color: '#0052a3', textDecoration: 'underline' }}>Terms and conditions</a>.
          </p>

          <h4 style={{ fontSize: '1.3rem', fontWeight: '600', margin: '0 0 1.6rem 0', color: '#1a1a2e' }}>
            What you need to know about how your data will be used:
          </h4>

          <ul style={{ margin: '0 0 1.6rem 0', paddingLeft: '2rem' }}>
            <li style={{ marginBottom: '1.2rem' }}>
              Full details of how your data will be used can be found in our <a href="#" style={{ color: '#0052a3', textDecoration: 'underline' }}>Privacy policy</a>, including information about your rights.
            </li>
            <li style={{ marginBottom: '1.2rem' }}>
              We will also check whether you fall within a market segment where additional price reductions are being offered at that time, due to specific arrangements with our partners. If you do fall within such a market segment, the reduced price will automatically be displayed for you.
            </li>
            <li style={{ marginBottom: '1.2rem' }}>
              Some insurance providers carry out soft credit checks on your credit history, these will not affect your credit rating.
            </li>
            <li style={{ marginBottom: '1.2rem' }}>
              If you are providing information about others, you must make sure they are aware of our <a href="#" style={{ color: '#0052a3', textDecoration: 'underline' }}>Privacy policy</a>.
            </li>
            <li style={{ marginBottom: '1.2rem' }}>
              In the future we will automatically check your <a href="#" style={{ color: '#0052a3', textDecoration: 'underline' }}>most relevant quote</a> with <a href="#" style={{ color: '#0052a3', textDecoration: 'underline' }}>some of our insurance providers</a> to see what your price could be for a future renewal. We'll use the data you have already provided and notify you of better quotes and more ways to save. Some insurance providers may carry out a soft credit search which does not impact your credit score.
            </li>
            <li style={{ marginBottom: '1.2rem' }}>
              Checking for better car insurance deals before you need to renew is included automatically as part of the service we provide, but you can turn it off at any time by adjusting the settings under 'Service preferences'. You can access your preferences via your Compare the Market account or by following a link in any future emails. If you don't have an account, you can easily create one by registering for one after seeing your quotes.
            </li>
            <li style={{ marginBottom: '0' }}>
              The latest on how to claim Meerkat Rewards® like restaurant discounts, and 2 for 1 cinema tickets – plus offers from partners we collaborate with or sponsor. Some insurance providers may carry out a soft credit search which does not impact your credit score.
            </li>
          </ul>
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

export default Step3ContactInformation;
