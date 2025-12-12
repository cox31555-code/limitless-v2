"use client";
import { useLoading } from "@/contexts/LoadingContext";

export const useLoadingAction = () => {
  const { showLoading, hideLoading } = useLoading();

  const withLoading = async (asyncAction) => {
    try {
      showLoading();
      const result = await asyncAction();
      return result;
    } catch (error) {
      throw error;
    } finally {
      hideLoading();
    }
  };

  return { withLoading, showLoading, hideLoading };
};
