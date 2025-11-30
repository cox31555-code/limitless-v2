"use client";
import React, { useState } from "react";
import styles from "./emailContactForm.module.css";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const EmailContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    policyNumber: "",
    inquiryType: "",
    priority: "normal",
    preferredContact: "email",
    bestTime: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = "Please select an inquiry type";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        policyNumber: "",
        inquiryType: "",
        priority: "normal",
        preferredContact: "email",
        bestTime: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.introBlock}>
          <h2 className={`${styles.introTitle} ${plusJakartaSans.className}`}>
            Send Us a Message
          </h2>
          <p className={`${styles.introText} ${manrope.className}`}>
            Have a question, concern, or feedback? Fill out the form below and our support team will get back to you within 24 hours. For urgent matters, please call us directly at <strong>0333 043 2085</strong>.
          </p>
          <div className={styles.infoCards}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3 className={`${styles.infoCardTitle} ${plusJakartaSans.className}`}>Response Time</h3>
                <p className={`${styles.infoCardText} ${manrope.className}`}>Within 24 hours on business days</p>
              </div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3 className={`${styles.infoCardTitle} ${plusJakartaSans.className}`}>Direct Email</h3>
                <p className={`${styles.infoCardText} ${manrope.className}`}>support@limitlesscover.co.uk</p>
              </div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3 className={`${styles.infoCardTitle} ${plusJakartaSans.className}`}>Live Chat</h3>
                <p className={`${styles.infoCardText} ${manrope.className}`}>Available for instant support</p>
              </div>
            </div>
          </div>
        </div>

        {submitSuccess && (
          <div className={styles.successAlert}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div>
              <strong>Message sent successfully!</strong>
              <p>We've received your message and will respond within 24 hours.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSection}>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Personal Information
            </h3>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={`${styles.label} ${manrope.className}`}>
                  First Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`${styles.input} ${manrope.className} ${errors.firstName ? styles.inputError : ''}`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <span className={`${styles.errorText} ${manrope.className}`}>{errors.firstName}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={`${styles.label} ${manrope.className}`}>
                  Last Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`${styles.input} ${manrope.className} ${errors.lastName ? styles.inputError : ''}`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <span className={`${styles.errorText} ${manrope.className}`}>{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={`${styles.label} ${manrope.className}`}>
                  Email Address <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.input} ${manrope.className} ${errors.email ? styles.inputError : ''}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <span className={`${styles.errorText} ${manrope.className}`}>{errors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={`${styles.label} ${manrope.className}`}>
                  Phone Number <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`${styles.input} ${manrope.className} ${errors.phone ? styles.inputError : ''}`}
                  placeholder="07XXX XXXXXX"
                />
                {errors.phone && (
                  <span className={`${styles.errorText} ${manrope.className}`}>{errors.phone}</span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="policyNumber" className={`${styles.label} ${manrope.className}`}>
                Policy Number <span className={styles.optional}>(Optional)</span>
              </label>
              <input
                type="text"
                id="policyNumber"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                className={`${styles.input} ${manrope.className}`}
                placeholder="Enter your policy number if applicable"
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Inquiry Details
            </h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="inquiryType" className={`${styles.label} ${manrope.className}`}>
                  Inquiry Type <span className={styles.required}>*</span>
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className={`${styles.select} ${manrope.className} ${errors.inquiryType ? styles.inputError : ''}`}
                >
                  <option value="">Select inquiry type</option>
                  <option value="general">General Inquiry</option>
                  <option value="policy">Policy Question</option>
                  <option value="claim">Claims Support</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="technical">Technical Issue</option>
                  <option value="complaint">Complaint</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
                {errors.inquiryType && (
                  <span className={`${styles.errorText} ${manrope.className}`}>{errors.inquiryType}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="priority" className={`${styles.label} ${manrope.className}`}>
                  Priority Level
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={`${styles.select} ${manrope.className}`}
                >
                  <option value="low">Low - General question</option>
                  <option value="normal">Normal - Standard inquiry</option>
                  <option value="high">High - Urgent matter</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={`${styles.label} ${manrope.className}`}>
                Subject <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`${styles.input} ${manrope.className} ${errors.subject ? styles.inputError : ''}`}
                placeholder="Brief description of your inquiry"
              />
              {errors.subject && (
                <span className={`${styles.errorText} ${manrope.className}`}>{errors.subject}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={`${styles.label} ${manrope.className}`}>
                Message <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`${styles.textarea} ${manrope.className} ${errors.message ? styles.inputError : ''}`}
                placeholder="Please provide detailed information about your inquiry..."
                rows="6"
              />
              {errors.message && (
                <span className={`${styles.errorText} ${manrope.className}`}>{errors.message}</span>
              )}
              <span className={`${styles.helperText} ${manrope.className}`}>
                {formData.message.length} characters (minimum 20 required)
              </span>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
              Contact Preferences
            </h3>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="preferredContact" className={`${styles.label} ${manrope.className}`}>
                  Preferred Contact Method
                </label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleChange}
                  className={`${styles.select} ${manrope.className}`}
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="either">Either is fine</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="bestTime" className={`${styles.label} ${manrope.className}`}>
                  Best Time to Contact <span className={styles.optional}>(Optional)</span>
                </label>
                <select
                  id="bestTime"
                  name="bestTime"
                  value={formData.bestTime}
                  onChange={handleChange}
                  className={`${styles.select} ${manrope.className}`}
                >
                  <option value="">Any time</option>
                  <option value="morning">Morning (9am - 12pm)</option>
                  <option value="afternoon">Afternoon (12pm - 5pm)</option>
                  <option value="evening">Evening (5pm - 8pm)</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.submitSection}>
            <p className={`${styles.privacyNote} ${manrope.className}`}>
              By submitting this form, you agree to our Privacy Policy and Terms of Service. We'll only use your information to respond to your inquiry.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.submitButton} ${manrope.className}`}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Sending...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EmailContactForm;
