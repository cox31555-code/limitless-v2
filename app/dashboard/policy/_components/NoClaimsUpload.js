"use client";

import React, { useState, useRef } from "react";
import styles from "./noClaimsUpload.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const NoClaimsUpload = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  const MAX_FILES = 10;
  const ACCEPTED_TYPE = "application/pdf";

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + sizes[i];
  };

  const validateFile = (file) => {
    if (file.type !== ACCEPTED_TYPE) {
      alert("Only PDF files are supported");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert(`File size must be less than ${formatFileSize(MAX_FILE_SIZE)}`);
      return false;
    }
    if (files.length >= MAX_FILES) {
      alert(`Maximum ${MAX_FILES} files allowed`);
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(validateFile);
    const filesWithMetadata = validFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: "PDF",
    }));
    setFiles((prev) => [...prev, ...filesWithMetadata]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleRemoveFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleDownloadFile = (file) => {
    const url = URL.createObjectURL(file.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className={styles.uploadSection} aria-labelledby="no-claims-upload-heading">
      <h3 id="no-claims-upload-heading" className={`${styles.sectionTitle} ${plusJakartaSans.className}`}>
        Upload Proof of No Claims Discount
      </h3>
      <p className={styles.sectionDescription}>
        Upload your No Claims Discount certificate to support your policy application
      </p>

      {/* Drop Zone */}
      <div
        className={`${styles.dropZone} ${isDragging ? styles.dragging : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Click or drag files to upload"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <div className={styles.uploadIcon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p className={styles.dropZoneText}>
          Drop files here or <span className={styles.browseLink}>browse files</span>
        </p>
        <div className={styles.dropZoneHint}>
          <div className={styles.hintTextPart}>
            Maximum file size: 50MB • Maximum files:{" "}
          </div>
          <div className={styles.hintTextPart}>
            {MAX_FILES}
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          className={styles.fileInput}
          aria-label="Upload PDF files"
        />
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className={styles.filesContainer}>
          <div className={styles.filesHeader}>
            <h4 className={styles.filesTitle}>Files ({files.length})</h4>
            <div className={styles.filesActions}>
              <button
                onClick={() => fileInputRef.current?.click()}
                className={styles.addFilesBtn}
                aria-label="Add more files"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add files
              </button>
              <button
                onClick={() => setFiles([])}
                className={styles.removeAllBtn}
                aria-label="Remove all files"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Remove all
              </button>
            </div>
          </div>

          <div className={styles.filesTable}>
            <div className={styles.tableHeader}>
              <div className={styles.columnName}>Name</div>
              <div className={styles.columnType}>Type</div>
              <div className={styles.columnSize}>Size</div>
              <div className={styles.columnActions}>Actions</div>
            </div>
            {files.map((file) => (
              <div key={file.id} className={styles.fileRow}>
                <div className={styles.fileName}>
                  <svg className={styles.fileIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                  <span>{file.name}</span>
                </div>
                <div className={styles.fileType}>
                  <span className={styles.typeBadge}>{file.type}</span>
                </div>
                <div className={styles.fileSize}>{formatFileSize(file.size)}</div>
                <div className={styles.fileActions}>
                  <button
                    onClick={() => handleDownloadFile(file)}
                    className={styles.actionBtn}
                    aria-label={`Download ${file.name}`}
                    title="Download"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    className={styles.actionBtn}
                    aria-label={`Remove ${file.name}`}
                    title="Remove"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default NoClaimsUpload;
