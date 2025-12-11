"use client";

import React from "react";
import dynamic from "next/dynamic";

const PaymentsClient = dynamic(() => import("./PaymentsClient"), {
  loading: () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px", color: "#666" }}>
      Loading payments...
    </div>
  ),
});

export default function PaymentsPageClient() {
  return <PaymentsClient />;
}
