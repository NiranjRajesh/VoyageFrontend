"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoadValues{
    isLoading:boolean;
    toggleLoading:() => void;

}


// Create a new context
const LoadingContext = createContext<LoadValues |undefined>(undefined);
interface LoadingProviderProps {
    children: ReactNode;
  }

// Create a provider component for the context
export const LoadingProvider:React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Define a function to toggle loading state
  const toggleLoading = () => setIsLoading((prevState) => !prevState);

  return (
    <LoadingContext.Provider value={{ isLoading, toggleLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Create a custom hook to access the context values
export const useLoading = () => {
    const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadProvider');
  }
  return context;
};
