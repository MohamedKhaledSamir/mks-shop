import { createContext, useContext, useState, ReactNode } from "react";

interface LoaderContextType {
  showLoader: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoaderProviderProps {
  children: ReactNode;
}

const LoaderContext = createContext<LoaderContextType>({
  showLoader: false,
  setShowLoader: () => {},
});

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);

  return (
    <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
