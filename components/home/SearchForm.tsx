"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

const SearchForm = () => {
  const [language, setLanguage] = useState("spanish");
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const router = useRouter();
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    } else {
      alert("Speech recognition not supported");
    }
  };

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    router.push(`/?q=${searchTerm}&language=${language}`);
  }, [searchTerm, language]);

  useEffect(() => {
    if (searchTerm === "") {
      router.push("/");
    }
  }, [searchTerm]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition() as ISpeechRecognition;
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === "english" ? "en-US" : "es-ES";

      recognitionRef.current.onresult = (event: any) => {
        setSearchTerm(event.results[0][0].transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.log("speech recognition error: ", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  return (
    <form className="w-full my-3">
      <div className="join">
        <label className="input input-bordered flex items-center gap-2 join-item">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            className="grow"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
          />
          {searchTerm === "" && (
            <button
              onClick={handleMicClick}
              type="button"
              className={clsx(isListening ? "text-red-600" : "text-black")}
            >
              <FaMicrophone />
            </button>
          )}
          {searchTerm !== "" && (
            <button
              type="button"
              className="text-red-600"
              onClick={() => setSearchTerm("")}
            >
              <FaTimes />
            </button>
          )}
        </label>
        <select
          className="select select-bordered join-item"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="spanish">Spanish</option>
          <option value="english">English</option>
        </select>

        <button className="btn join-item">Search</button>
      </div>
    </form>
  );
};

export default SearchForm;
