import { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextType {
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextType>({
  showToast: false,
  setShowToast: () => {},
  type: "success",
  setType: () => {},
  message: "",
  setMessage: () => {},
});

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [type, setType] = useState<string>("success");
  const [message, setMessage] = useState<string>("");

  return (
    <ToastContext.Provider
      value={{ showToast, setShowToast, type, setType, message, setMessage }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
