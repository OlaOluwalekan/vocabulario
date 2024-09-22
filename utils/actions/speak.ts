import { franc } from "franc";

export const handleSpeak = (text: string) => {
  if ("speechSynthesis" in window) {
    const detectedLang = franc(text, { minLength: 1 });
    // console.log('det: ', detectedLang)

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-Es";

    window.speechSynthesis.speak(utterance);
  } else {
    alert("Tu navegador no soporta la API SpeechSynthesis");
  }
  //   console.log(text)
};
