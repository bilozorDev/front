"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface UseQueryParamsToggleProps {
  paramsName: string;
  defaultValue?: string;
}

export const useQueryParamsToggle = ({
  paramsName,
  defaultValue = "true",
}: UseQueryParamsToggleProps) => {
  const [isActive, setIsActive] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Set isActive based on search params
  useEffect(() => {
    const paramValue = searchParams.get(paramsName);
    setIsActive(paramValue === defaultValue);
  }, [searchParams, paramsName, defaultValue]);

  // Handle toggle
  const handleToggle = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (isActive) {
      // If currently active, remove the parameter
      params.delete(paramsName);
    } else {
      // If not active, add the parameter with default value
      params.set(paramsName, defaultValue);
    }

    // Update the URL
    router.push(`${pathname}?${params.toString()}`);
  };

  return { isActive, handleToggle };
};
