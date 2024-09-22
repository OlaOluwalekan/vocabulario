import ChatArea from "@/components/chat/ChatArea";
import ChatInput from "@/components/chat/ChatInput";
import KeyBoard from "@/components/word/KeyBoard";
import { getChatById } from "@/utils/actions/chat";
import { getMessages } from "@/utils/actions/message";
import { getWords } from "@/utils/actions/words";
import Link from "next/link";

const SingleChatPage = async ({ params }: { params: { chatId: string } }) => {
  const chatResponse = await getChatById(params.chatId);
  const words = await getWords("", "spanish");
  const flatWords = words.map((word) => {
    return word.spanish;
  });
  const messagesResponse = await getMessages(params.chatId);
  // console.log("words: ", flatWords.join(" "));
  // console.log("chatById:", messagesResponse);

  return (
    <div>
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold leading-10">
            {chatResponse.data
              ? chatResponse.data.title
              : "Failed to load chat"}
          </h1>
          <KeyBoard styleClass="flex-row px-2" keyStyle="w-[30px] mx-1" />
        </div>
        {chatResponse.data ? (
          <ChatArea data={messagesResponse.data as []} />
        ) : (
          <div className="h-[calc(100vh-180px)] flex justify-center items-center flex-col">
            <h3 className="text-3xl font-bold">Oops!</h3>
            <p className="my-2 text-center">
              Couldn't find this chat. The chat may have been deleted
            </p>
            <Link
              href="/chat"
              className="bg-primary text-primary-content px-5 py-2 rounded-md"
            >
              Back to Chats
            </Link>
          </div>
        )}
        {chatResponse.data && (
          <ChatInput
            context={chatResponse.data?.context as string}
            words={flatWords.join("")}
            modelName={chatResponse.data?.modelName as string}
            description={chatResponse.data?.description as string}
            chatId={params.chatId}
            history={
              messagesResponse.success ? (messagesResponse.data as []) : []
            }
          />
        )}
      </div>
    </div>
  );
};

export default SingleChatPage;
