"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import PdfViewerModal from "./PdfViewerModal";

export default function DocumentActions({ insuranceId, pdfType, documentName }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleView = async () => {
    try {
      // Use mock PDF from Google Drive for testing
      const mockPdfUrl = "https://drive.google.com/file/d/1jHtgmKi03bMQ3sJia8L8ml6-BAZFJvnD/preview";

      setPdfUrl(mockPdfUrl);
      setIsPdfModalOpen(true);

      // Real implementation (commented out for now)
      /*
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

      setPdfUrl(url);
      setIsPdfModalOpen(true);
      */
    } catch (error) {
      console.error("View error:", error);
      toast.error("Failed to open PDF");
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // Use mock PDF from Google Drive for testing
      const mockPdfUrl = "https://drive.google.com/uc?export=download&id=1jHtgmKi03bMQ3sJia8L8ml6-BAZFJvnD";

      // Simulate download delay for loading animation
      await new Promise(resolve => setTimeout(resolve, 800));

      const link = document.createElement("a");
      link.href = mockPdfUrl;
      link.download = `${documentName || 'Document'}.pdf`;
      link.target = "_blank";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);

      toast.success("PDF download started!");

      // Real implementation (commented out for now)
      /*
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
      */
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCloseModal = () => {
    setIsPdfModalOpen(false);
    // Clean up blob URL if it was created
    if (pdfUrl && pdfUrl.startsWith("blob:")) {
      window.URL.revokeObjectURL(pdfUrl);
    }
    setPdfUrl(null);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleView}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0",
            color: "#0052a3",
            fontSize: "1rem",
            fontWeight: "600",
            lineHeight: "130%",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0",
            transition: "color 0.2s ease",
            whiteSpace: "nowrap",
            textDecoration: "underline",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#003d7a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#0052a3";
          }}
        >
          <span>View Online</span>
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
        {isDownloading && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              animation: "spin 1s linear infinite",
            }}
          >
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="60"
              strokeDashoffset="20"
              opacity="0.25"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )}
        <span>{isDownloading ? "Downloading..." : "Download PDF"}</span>
      </button>
      </div>

      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={handleCloseModal}
        pdfUrl={pdfUrl}
        documentName={documentName}
      />
    </>
  );
}
