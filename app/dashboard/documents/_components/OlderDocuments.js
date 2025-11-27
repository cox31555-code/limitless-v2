"use client";

import Image from "next/image";
import styles from "./olderDocuments.module.css";

const documents = [
  {
    id: 1,
    title: "Your policy has been cancelled",
    date: "Wed 3 Apr, 2024",
  },
  {
    id: 2,
    title: "Thanks for renewing your policy",
    date: "Sun 10 Mar, 2024",
  },
  {
    id: 3,
    title: "It is time to renew your policy",
    date: "Sat 10 Feb, 2024",
  },
  {
    id: 4,
    title: "Your welcome pack",
    date: "Thu 9 Mar, 2023",
  },
];

export default function OlderDocuments() {
  const handleView = (docId) => {
    console.log("View document:", docId);
  };

  const handleDownload = (docId) => {
    console.log("Download document:", docId);
  };

  const handleSendByPost = (docId) => {
    console.log("Send by post:", docId);
  };

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Older documents</h3>
      
      <div className={styles.documentsList}>
        {documents.map((doc) => (
          <div key={doc.id} className={styles.documentItem}>
            <div className={styles.documentInfo}>
              <h4 className={styles.documentTitle}>{doc.title}</h4>
              <p className={styles.documentDate}>{doc.date}</p>
            </div>
            
            <div className={styles.documentActions}>
              <button 
                onClick={() => handleView(doc.id)}
                className={styles.actionButton}
              >
                <Image src="/svg/eye.svg" alt="view" width={16} height={16} />
                View
              </button>
              
              <button 
                onClick={() => handleDownload(doc.id)}
                className={styles.actionButton}
              >
                <Image src="/svg/download.svg" alt="download" width={16} height={16} />
                Download
              </button>
              
              <button 
                onClick={() => handleSendByPost(doc.id)}
                className={styles.actionButton}
              >
                <Image src="/svg/mail-send.svg" alt="send by post" width={16} height={16} />
                Send by post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
