import Link from "next/link";

const PracticePage = () => {
  return (
    <div>
      <div className="w-[90%] max-w-[1200px] h-[calc(100vh-100px)] flex flex-col justify-center items-center mx-auto gap-2">
        <Link
          href="/chat"
          className="w-40 flex justify-center items-center bg-primary text-primary-content py-2 rounded"
        >
          Chat with AI
        </Link>
        <Link
          href="/questionnaire"
          className="w-40 flex justify-center items-center bg-primary text-primary-content py-2 rounded"
        >
          Questionnaire
        </Link>
        <Link
          href="/translator"
          className="w-40 flex justify-center items-center bg-primary text-primary-content py-2 rounded"
        >
          Translator
        </Link>
      </div>
    </div>
  );
};

export default PracticePage;
