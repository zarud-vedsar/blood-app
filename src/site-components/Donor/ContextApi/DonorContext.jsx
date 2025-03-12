import React, { createContext, useState, useContext } from "react";

// Create Context
const DonorContext = createContext();

// Provider Component
export const DonorProvider = ({ children }) => {
  const [donor, setDonor] = useState(null); // Store Donor details

  return (
    <DonorContext.Provider value={{ donor, setDonor }}>
      {children}
    </DonorContext.Provider>
  );
};

// Custom Hook to use DonorContext
export const useDonor = () => useContext(DonorContext);
