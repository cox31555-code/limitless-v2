"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useError } from "@/contexts/ErrorContext";

export default function DownloadButton({
  insuranceId,
  pdfType,
  label = "Download PDF",
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const { addError } = useError();

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);

    try {
      // Use server-side proxy route to avoid CORS/cookie issues
      const downloadUrl = `/api/download-pdf/${insuranceId}/${pdfType}`;

      // Make request to our Next.js API route (same-origin, no CORS issues)
      const response = await fetch(downloadUrl, {
        method: "GET",
        headers: {
          "Accept": "application/pdf",
        },
      });

      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          addError({
            message: "Session expired. Please log in again.",
          });
          // Redirect to login after a short delay
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          return;
        }
        if (response.status === 403) {
          addError({
            message: "You don't have permission to access this document.",
          });
          return;
        }
        if (response.status === 404) {
          addError({
            message: "Document not found.",
          });
          return;
        }
        throw new Error(`Failed to download PDF: ${response.status} ${response.statusText}`);
      }

      // Check if response is actually a PDF
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/pdf")) {
        addError({
          message: "Server did not return a valid PDF file.",
        });
        return;
      }

      // Get the blob from response
      const blob = await response.blob();

      // Verify blob is not empty
      if (blob.size === 0) {
        addError({
          message: "Downloaded file is empty.",
        });
        return;
      }

      // Get filename from content-disposition header or use default
      const contentDisposition = response.headers.get("content-disposition");
      let filename = `Document_${insuranceId}.pdf`;
      if (contentDisposition) {
        // Match filename with or without quotes, but don't include quotes in capture
        const filenameMatch = contentDisposition.match(
          /filename="([^"]+)"|filename=([^;\s]+)/
        );
        if (filenameMatch) {
          // Use the first non-null capture group
          filename = filenameMatch[1] || filenameMatch[2];
        }
      }

      // Create a blob URL with explicit PDF type
      const pdfBlob = new Blob([blob], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);

      // Create a download link and trigger it
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      // Cleanup after a short delay to ensure download starts
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      addError({
        message: "Failed to download PDF. Please try again.",
        action: handleDownload,
      });
    } finally {
      setIsDownloading(false);
    }
  }, [insuranceId, pdfType, addError]);

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        color: "#0052a3",
        fontSize: "1.2rem",
        fontWeight: "600",
        lineHeight: "130%",
        background: "transparent",
        border: "none",
        cursor: isDownloading ? "not-allowed" : "pointer",
        padding: "0.6rem 0",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: isDownloading ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isDownloading) {
          e.currentTarget.style.color = "#003d7a";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDownloading) {
          e.currentTarget.style.color = "#0052a3";
        }
      }}
    >
      <Image src="/svg/pdf.svg" alt="pdf" width={28} height={28} />
      <span>{isDownloading ? "Downloading..." : label}</span>
    </button>
  );
}
