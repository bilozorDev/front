"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface UseQueryParamsToggleProps {
  paramsName: string;
}

export const useQueryParamsToggle = ({
  paramsName,
}: UseQueryParamsToggleProps) => {
  const [isActive, setIsActive] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // if param is true, set isActive to true
  useEffect(() => {
    const paramValue = searchParams.get(paramsName);
    if (paramValue) {
      setIsActive(paramValue === "true");
    }
  }, [searchParams]);

  // handle toggle
  const handleToggle = () => {
    setIsActive(!isActive);
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramsName);
    router.push(pathname + "?" + params.toString());
  };

  return { isActive, handleToggle };
};
