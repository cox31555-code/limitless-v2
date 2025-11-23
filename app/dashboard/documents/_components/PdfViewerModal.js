"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./pdfViewerModal.module.css";

export default function PdfViewerModal({ isOpen, onClose, pdfUrl, documentName }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{documentName || "Document Viewer"}</h3>
          <div className={styles.headerActions}>
            <button
              className={styles.previewButton}
              onClick={handleOpenInNewTab}
              aria-label="Open PDF in new tab"
              title="Open in new tab"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 3h6v6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14L21 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              <Image
                src="/svg/close.svg"
                alt="Close"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
        
        <div className={styles.pdfContainer}>
          <iframe
            src={pdfUrl}
            className={styles.pdfViewer}
            title={documentName || "PDF Document"}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
