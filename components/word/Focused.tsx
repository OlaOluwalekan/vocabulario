import { useEffect, useState } from "react";

const useFocusedInput = () => {
  const [focused, setFocused] = useState<
    HTMLInputElement | HTMLTextAreaElement | null
  >(null);

  useEffect(() => {
    const handleFocused = (e: FocusEvent) => {
      if (
        (e.target instanceof HTMLInputElement && e.target.type === "text") ||
        e.target instanceof HTMLTextAreaElement
      ) {
        setFocused(e.target);
      }
    };

    const handleBlurred = (event: FocusEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        setFocused(null);
      }
    };

    document.addEventListener("focusin", handleFocused);
    document.addEventListener("focusout", handleBlurred);

    return () => {
      document.removeEventListener("focusin", handleFocused);
      document.removeEventListener("focusout", handleBlurred);
    };
  }, []);

  return focused;
};

export default useFocusedInput;
