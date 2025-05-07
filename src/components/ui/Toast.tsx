import { useEffect } from "react";
import { useToast } from "../../contexts/ToastContext";

export default function Toast() {
  const { message, type, setShowToast } = useToast();
  useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, 1200);
  }, []);
  return (
    <div
      role="alert"
      className="rounded-md border border-gray-300 bg-white p-4 shadow-sm  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div className="flex items-start gap-4">
        {type === "success" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-success"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <div className="flex-1">
          <strong className="font-medium text-sm text-gray-900 text-nowrap">
            {" "}
            {message}{" "}
          </strong>
        </div>
      </div>
    </div>
  );
}
