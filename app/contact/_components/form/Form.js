"use client";
import React, { useState } from "react";
import styles from "./form.module.css";
import Image from "next/image";
import TextInput from "@/ui/inputs/textInput/TextInput";
import TextArea from "@/ui/inputs/textArea/TextArea";
import Selection1 from "@/ui/inputs/selections/selection1/Selection1";
import { API_BASE_URL } from "@/utils/config";
import { toast } from "react-toastify";
const Form = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    message: "",
    type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.type) {
      newErrors.type = "Please select an option";
    }
    if (!data.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!data.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.fullName,
          email: data.email,
          message: data.message,
          type: data.type,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        // Reset form
        setData({
          fullName: "",
          email: "",
          message: "",
          type: "",
        });
        setErrors({});
      } else {
        toast.error(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Select the Appropriate Option</label>
        <Selection1
          items={["Marketing", "Policy Enquires", "Question", "Complaint", "Cancellations", "Other"]}
          selectedItem={data.type}
          setSelectedItem={(item) => {
            setData({ ...data, type: item });
            setErrors({ ...errors, type: "" });
          }}
          type="checkbox"
        />
        {errors.type && <span className={styles.error}>{errors.type}</span>}
      </div>
      <div className={styles.dropdown}>
        <select
          value={data.type}
          onChange={(e) => {
            setData({ ...data, type: e.target.value });
            setErrors({ ...errors, type: "" });
          }}
          className={styles.nativeSelect}
        >
          <option value="">Select the Appropriate Option</option>
          <option value="Marketing">Marketing</option>
          <option value="Policy Enquires">Policy Enquires</option>
          <option value="Question">Question</option>
          <option value="Complaint">Complaint</option>
          <option value="Cancellations">Cancellations</option>
          <option value="Other">Other</option>
        </select>
        {errors.type && <span className={styles.error}>{errors.type}</span>}
      </div>
      <div className={styles.row}>
        <div className={styles.inputWrapper}>
          <TextInput
            label="Full Name"
            value={data.fullName}
            onChange={(e) => {
              setData({ ...data, fullName: e.target.value });
              setErrors({ ...errors, fullName: "" });
            }}
            placeholder="Enter your Full Name"
            type="text"
          />
          {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            label="Email Address"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
              setErrors({ ...errors, email: "" });
            }}
            placeholder="Enter your Email Address"
            type="email"
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <TextArea
          label="Your Message"
          value={data.message}
          onChange={(e) => {
            setData({ ...data, message: e.target.value });
            setErrors({ ...errors, message: "" });
          }}
          placeholder="Enter your Message"
          rows={5}
        />
        {errors.message && <span className={styles.error}>{errors.message}</span>}
      </div>

      <button type="submit" className={styles.button} disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}{" "}
        <Image
          src="/svg/arrow-right.svg"
          alt="arrow-right"
          width={27}
          height={14}
        />
      </button>
    </form>
  );
};

export default Form;
