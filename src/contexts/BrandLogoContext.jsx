import React, { createContext, useContext } from "react";

const BrandLogoContext = createContext("");

export function BrandLogoProvider({ logo = "", children }) {
  return (
    <BrandLogoContext.Provider value={typeof logo === "string" ? logo : ""}>
      {children}
    </BrandLogoContext.Provider>
  );
}

export function useBrandLogo() {
  return useContext(BrandLogoContext);
}
