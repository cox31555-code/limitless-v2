"use client";

import React, { useState } from "react";
import styles from "./expandableQuestion.module.css";

const ExpandableQuestion = ({
  question,
  answer,
  defaultExpanded = false,
  expanded,
  onToggle,
  className = ""
}) => {
  // Handle both controlled and uncontrolled states
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = expanded !== undefined ? expanded : internalExpanded;

  const handleToggle = () => {
    if (expanded === undefined) {
      setInternalExpanded(!internalExpanded);
    }
    if (onToggle) {
      onToggle(!isExpanded);
    }
  };

  return (
    <div className={`${styles.expandableContainer} ${className}`}>
      <button
        type="button"
        className={styles.expandableLink}
        onClick={handleToggle}
        aria-expanded={isExpanded}
      >
        <span className={`${styles.expandableIcon} ${isExpanded ? styles.expandedIcon : ""}`}>
          ▼
        </span>
        {question}
      </button>

      {isExpanded && (
        <div className={styles.expandableContent}>
          {typeof answer === "string" ? <p>{answer}</p> : answer}
        </div>
      )}
    </div>
  );
};

export default ExpandableQuestion;
