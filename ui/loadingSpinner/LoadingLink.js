"use client";
import Link from "next/link";
import { useLoading } from "@/contexts/LoadingContext";

export default function LoadingLink({ href, children, className, ...props }) {
  const { showLoading } = useLoading();

  const handleClick = (e) => {
    if (href && href !== "#") {
      showLoading();
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <Link href={href} className={className} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
