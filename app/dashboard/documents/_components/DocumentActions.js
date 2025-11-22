"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function DocumentActions({ insuranceId, pdfType }) {
  const [isViewing, setIsViewing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleView = async () => {
    setIsViewing(true);

    try {
      const downloadUrl = `/api/download-pdf/${insuranceId}/${pdfType}`;

      const response = await fetch(downloadUrl, {
        method: "GET",
        headers: {
          "Accept": "application/pdf",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Session expired. Please log in again.");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          return;
        }
        if (response.status === 403) {
          toast.error("You don't have permission to access this document.");
          return;
        }
        if (response.status === 404) {
          toast.error("Document not found.");
          return;
        }
        throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/pdf")) {
        toast.error("Server did not return a valid PDF file.");
        return;
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        toast.error("Downloaded file is empty.");
        return;
      }

      const pdfBlob = new Blob([blob], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);

      window.open(url, "_blank");

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);

      toast.success("PDF opened successfully!");
    } catch (error) {
      console.error("View error:", error);
      toast.error("Failed to open PDF");
    } finally {
      setIsViewing(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const downloadUrl = `/api/download-pdf/${insuranceId}/${pdfType}`;

      const response = await fetch(downloadUrl, {
        method: "GET",
        headers: {
          "Accept": "application/pdf",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Session expired. Please log in again.");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          return;
        }
        if (response.status === 403) {
          toast.error("You don't have permission to access this document.");
          return;
        }
        if (response.status === 404) {
          toast.error("Document not found.");
          return;
        }
        throw new Error(`Failed to download PDF: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/pdf")) {
        toast.error("Server did not return a valid PDF file.");
        return;
      }

      const blob = await response.blob();
      
      if (blob.size === 0) {
        toast.error("Downloaded file is empty.");
        return;
      }

      const contentDisposition = response.headers.get("content-disposition");
      let filename = `Document_${insuranceId}.pdf`;
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(
          /filename="([^"]+)"|filename=([^;\s]+)/
        );
        if (filenameMatch) {
          filename = filenameMatch[1] || filenameMatch[2];
        }
      }

      const pdfBlob = new Blob([blob], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <button
        onClick={handleView}
        disabled={isViewing}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#0052a3",
          fontSize: "1rem",
          fontWeight: "600",
          lineHeight: "130%",
          background: "transparent",
          border: "none",
          cursor: isViewing ? "not-allowed" : "pointer",
          padding: "0",
          transition: "color 0.2s ease",
          opacity: isViewing ? 0.7 : 1,
          whiteSpace: "nowrap",
          textDecoration: "underline",
        }}
        onMouseEnter={(e) => {
          if (!isViewing) {
            e.currentTarget.style.color = "#003d7a";
          }
        }}
        onMouseLeave={(e) => {
          if (!isViewing) {
            e.currentTarget.style.color = "#0052a3";
          }
        }}
      >
        <Image src="/svg/pdf-doc.svg" alt="view document" width={16} height={16} />
        <span>{isViewing ? "Loading..." : "View Document"}</span>
      </button>

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#0052a3",
          fontSize: "1rem",
          fontWeight: "600",
          lineHeight: "130%",
          background: "transparent",
          border: "none",
          cursor: isDownloading ? "not-allowed" : "pointer",
          padding: "0",
          transition: "color 0.2s ease",
          opacity: isDownloading ? 0.7 : 1,
          whiteSpace: "nowrap",
          textDecoration: "underline",
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
        <Image src="/svg/download.svg" alt="download" width={16} height={16} />
        <span>{isDownloading ? "Downloading..." : "Download"}</span>
      </button>
    </div>
  );
}
