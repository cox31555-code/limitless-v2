import { useMemo } from "react";
import dynamic from "next/dynamic";

const StepFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "1.3rem" }}>
    Loading...
  </div>
);

// Cache for loaded components to avoid re-importing
const componentCache = new Map();

export function useLazyStep(componentPath, isActive) {
  return useMemo(() => {
    if (!isActive) return null;
    
    if (!componentCache.has(componentPath)) {
      componentCache.set(
        componentPath,
        dynamic(() => import(componentPath), {
          ssr: false,
          loading: () => <StepFallback />
        })
      );
    }
    
    return componentCache.get(componentPath);
  }, [componentPath, isActive]);
}
