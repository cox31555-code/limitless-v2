"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoading } from "@/contexts/LoadingContext";

export function PageLoadingHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { hideLoading } = useLoading();

  useEffect(() => {
    hideLoading();
  }, [pathname, searchParams, hideLoading]);

  return null;
}
