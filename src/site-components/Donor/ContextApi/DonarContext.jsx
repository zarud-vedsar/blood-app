import React, { createContext, useState, useContext } from "react";

// Create Context
const DonarContext = createContext();

// Provider Component
export const DonarProvider = ({ children }) => {
  const [donar, setDonar] = useState(null); // Store Donar details

  return (
    <DonarContext.Provider value={{ donar, setDonar }}>
      {children}
    </DonarContext.Provider>
  );
};

// Custom Hook to use DonarContext
export const useDonar = () => useContext(DonarContext);
