import { useEffect, useState } from "react";

const SUCCESS_MESSAGE_TIMEOUT_MS = 3000;

export function useSuccessMessage() {
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setSuccessMessage("");
    }, SUCCESS_MESSAGE_TIMEOUT_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [successMessage]);

  function clearSuccessMessage() {
    setSuccessMessage("");
  }

  return {
    successMessage,
    setSuccessMessage,
    clearSuccessMessage,
  };
}
