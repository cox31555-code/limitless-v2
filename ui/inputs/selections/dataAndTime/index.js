import dynamic from "next/dynamic";

export default dynamic(() => import("./DataAndTime"), {
  loading: () => <div style={{ padding: "20px", textAlign: "center", color: "#999" }}>Loading date picker...</div>,
  ssr: false,
});
