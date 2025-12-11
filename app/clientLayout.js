"use client";

import Header from "@/ui/layout/header/Header";
import { ToastContainer } from "react-toastify";
import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";
import { PageLoadingHandler } from "@/ui/loadingSpinner/PageLoadingHandler";
import ErrorBanner from "@/ui/errorHandling/ErrorBanner";
import { useLoading } from "@/contexts/LoadingContext";

export default function ClientLayout({ children }) {
  const { isLoading } = useLoading();

  return (
    <>
      <PageLoadingHandler />
      <ErrorBanner />
      <Header />
      {children}
      {isLoading && <LoadingOverlay isVisible={isLoading} text="Loading" />}
      <ToastContainer
        position="bottom-center"
        autoClose={3500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={true}
        theme="light"
        limit={1}
      />
    </>
  );
}
