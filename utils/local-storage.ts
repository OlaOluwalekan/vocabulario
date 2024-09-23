"use client";

const useLocalStorage = () => {
  const addToLocalStorage = (key: string, value: string) => {
    // if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
    // }
  };

  const getFromLocalStorage = (key: string) => {
    // if (typeof window !== "undefined") {
    return localStorage.getItem(key) || "";
    // }

    return "";
  };

  const removeFromLocalStorage = (key: string) => {
    // if (typeof window !== "undefined") {
    localStorage.removeItem(key);
    // }
  };

  return { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage };
};

export default useLocalStorage;
