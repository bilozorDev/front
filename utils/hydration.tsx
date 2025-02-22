"use client";

// This is a client-only component that rehydrates the quote store
// to prevent hydration errors

import * as React from "react";
import useQuoteStore from "@/store/quote-store";

const Hydration = () => {
  React.useEffect(() => {
    useQuoteStore.persist.rehydrate();
  }, []);

  return null;
};

export default Hydration;
