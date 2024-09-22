import axios from "axios";

const VOICES = {
  AlvaroNeural: "es-ES-AlvaroNeural",
  ElviraNeural: "es-ES-ElviraNeural",
};

export const readAloud = (text: string, cb: (speaking: boolean) => void) => {
  const synth = window.speechSynthesis;
  if ("speechSynthesis" in window) {
    if (synth.speaking) {
      console.error("Speech synthesis is already speaking.");
      return;
    }
    const voices = synth.getVoices();
    const voice = voices.find((voice) => voice.default) || voices[0];

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.voice = voice;
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    utterance.onend = () => {
      cb(false);
    };
    cb(true);

    synth.speak(utterance);
  }
};

export const handleStop = (cb: (speaking: boolean) => void) => {
  const synth = window.speechSynthesis;
  if (synth.speaking) {
    synth.cancel();
    cb(false);
  }
};

export const readSpanish = async (
  text: string,
  cb: (speaking: boolean) => void
) => {
  const options = {
    method: "POST",
    url: "https://azure-ai-speech.p.rapidapi.com/synthesize",
    headers: {
      "x-rapidapi-key": "b3c7b71d15msh4966d113aace904p1ca73bjsn8d3ee2075fef",
      "x-rapidapi-host": "azure-ai-speech.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      shortName: VOICES.AlvaroNeural,
      text,
      pitch: 10,
      rate: 10,
      volume: null,
    },
    responseType: "blob",
  };

  cb(true);
  try {
    const { data } = await axios.request(options as any);
    const audioUrl = URL.createObjectURL(data);
    const audio = new Audio(audioUrl);
    // Wait until the audio finishes playing before calling the callback
    audio.onended = () => {
      cb(false); // Indicating that speech has finished
    };
    audio.play();
  } catch (error) {
    console.error(error);
  }
};

export const stopSpanish = (cb: (speaking: boolean) => void) => {
  const synth = window.speechSynthesis;
  if (synth.speaking) {
    synth.cancel();
    cb(false);
  }
};
