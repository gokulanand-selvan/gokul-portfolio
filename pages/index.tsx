import React from "react";
import Home from "./Home";
import Script from "next/script";

export default function index() {
  return (
    <>
          <Script src="/pet/content.js" strategy="afterInteractive" />
      <Home />
    </>
  );
}
