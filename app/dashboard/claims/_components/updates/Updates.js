import React from "react";
import styles from "./updates.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Updates = ({ columns, data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (description) => {
    if (description?.toLowerCase().includes("submitted")) {
      return styles.statusSubmitted;
    }
    if (description?.toLowerCase().includes("pending")) {
      return styles.statusPending;
    }
    if (description?.toLowerCase().includes("completed")) {
      return styles.statusCompleted;
    }
    if (description?.toLowerCase().includes("approved")) {
      return styles.statusApproved;
    }
    return styles.statusDefault;
  };

  return (
    <div className={styles.container}>
      <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
        Claim Activity Timeline
      </h3>
      <div className={styles.timeline}>
        {data.map((update, index) => {
          const isLatest = index === data.length - 1;
          const formattedDate = formatDate(update.date);
          const formattedTime = formatTime(update.date);

          return (
            <div key={index} className={`${styles.timelineItem} ${isLatest ? styles.latest : ''}`}>
              <div className={styles.timelineMarker}>
                <div className={`${styles.dot} ${getStatusClass(update.description)}`} />
                {index !== data.length - 1 && <div className={styles.line} />}
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.updateHeader}>
                  <h4 className={styles.updateTitle}>{update.description}</h4>
                  <div className={styles.updateMeta}>
                    <span className={styles.dateTime}>
                      <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {formattedDate}
                    </span>
                    <span className={styles.dateTime}>
                      <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {formattedTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Updates;
