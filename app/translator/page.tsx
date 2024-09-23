import TranslateFeedback from "@/components/translate/TranslateFeedback";
import TranslateForm from "@/components/translate/TranslateForm";
import TranslateHeader from "@/components/translate/TranslateHeader";
import { getWords } from "@/utils/actions/words";

const TranslatorPage = async () => {
  const words = await getWords("", "spanish");
  const flatWords = words.map((word) => {
    return word.english;
  });
  //   console.log("words", flatWords);

  return (
    <div className="h-[calc(100vh-100px)]">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <TranslateHeader words={flatWords.join(" ")} />
        <TranslateForm />
        <TranslateFeedback />
      </div>
    </div>
  );
};

export default TranslatorPage;
