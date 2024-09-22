import Message from "./Message";

const Chat = ({
  id,
  content,
  response,
  contentTranslation,
  responseTranslation,
}: {
  id: string;
  content: string;
  response: string;
  contentTranslation: string;
  responseTranslation: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {/* content - my message */}
      <Message
        content={content}
        containerStyle="justify-end"
        mainStyle="bg-green-800"
        translation={contentTranslation}
      />

      {/* response - bot's message */}
      <Message
        content={response}
        containerStyle="justify-start"
        mainStyle="bg-blue-800"
        translation={responseTranslation}
      />
    </div>
  );
};

export default Chat;
