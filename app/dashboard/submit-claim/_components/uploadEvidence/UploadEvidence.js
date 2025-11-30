"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import styles from "./uploadEvidence.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const UploadEvidence = ({ register, errors }) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 250 * 1024 * 1024; // 250MB
  const MAX_FILES = 20;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFileType = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    const imageTypes = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"];
    const videoTypes = ["mp4", "avi", "mov", "wmv", "flv", "webm"];
    const documentTypes = ["pdf", "doc", "docx", "txt", "xls", "xlsx"];

    if (imageTypes.includes(ext)) return "image";
    if (videoTypes.includes(ext)) return "video";
    if (documentTypes.includes(ext)) return "document";
    return "file";
  };

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      alert(
        `File "${file.name}" is too large. Maximum file size is ${formatFileSize(
          MAX_FILE_SIZE
        )}`
      );
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
    e.target.value = ""; // Reset input
  };

  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(validateFile);
    const filesWithMetadata = validFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: getFileType(file.name),
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
      description: "",
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
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const handleDescriptionChange = (fileId, description) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, description } : f))
    );
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "document":
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
        );
      case "video":
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        );
      default:
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
            <polyline points="13 2 13 9 20 9" />
          </svg>
        );
    }
  };

  return (
    <div className={styles.formSection}>
      <h3 className={styles.sectionTitle}>Upload Evidence</h3>
      <p className={styles.sectionDescription}>
        Upload photos, videos, or documents related to your claim. Maximum {MAX_FILES} files, up to{" "}
        {formatFileSize(MAX_FILE_SIZE)} each.
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
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p className={styles.dropZoneText}>
          Drop files here or{" "}
          <span className={styles.browseLink}>browse files</span>
        </p>
        <p className={styles.dropZoneHint}>
          All file types accepted • Max {MAX_FILES} files • {formatFileSize(MAX_FILE_SIZE)} per file
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className={styles.fileInput}
          aria-label="Upload files"
        />
      </div>

      {/* Files List with Previews */}
      {files.length > 0 && (
        <div className={styles.filesContainer}>
          <div className={styles.filesHeader}>
            <h4 className={styles.filesTitle}>
              Uploaded Evidence ({files.length}/{MAX_FILES})
            </h4>
            <button
              type="button"
              onClick={() => {
                files.forEach((f) => {
                  if (f.preview) URL.revokeObjectURL(f.preview);
                });
                setFiles([]);
              }}
              className={styles.removeAllBtn}
              aria-label="Remove all files"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Remove all
            </button>
          </div>

          <div className={styles.filesGrid}>
            {files.map((file) => (
              <div key={file.id} className={styles.fileCard}>
                <div className={styles.filePreview}>
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className={styles.previewImage}
                    />
                  ) : (
                    <div className={styles.fileIconWrapper}>
                      {getFileIcon(file.type)}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file.id)}
                    className={styles.removeBtn}
                    aria-label={`Remove ${file.name}`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className={styles.fileInfo}>
                  <h5 className={styles.fileName} title={file.name}>
                    {file.name}
                  </h5>
                  <p className={styles.fileSize}>{formatFileSize(file.size)}</p>
                  <input
                    type="text"
                    placeholder="What is this file for? (e.g., Damage to front bumper)"
                    value={file.description}
                    onChange={(e) =>
                      handleDescriptionChange(file.id, e.target.value)
                    }
                    className={styles.descriptionInput}
                    aria-label={`Description for ${file.name}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadEvidence;
