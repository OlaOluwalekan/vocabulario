import ChatList from "@/components/chat/ChatList";
import CreateChatPopup from "@/components/chat/CreateChatPopup";
import { getChats } from "@/utils/actions/chat";

const ChatPage = async () => {
  const chatsResponse = await getChats();

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] bg-teal-200">
      <div className="w-[90%] h-full mx-auto flex flex-col justify-center items-center text-center gap-5">
        {!chatsResponse.data ||
          (chatsResponse.data.length == 0 && (
            <p>
              {!chatsResponse.success
                ? chatsResponse.message
                : "Click the button below to start a new practice chat with AI"}
            </p>
          ))}

        {chatsResponse.data && chatsResponse.data.length > 0 && (
          <ChatList data={chatsResponse?.data} />
        )}

        <CreateChatPopup chatLength={chatsResponse.data?.length as number} />
      </div>
    </div>
  );
};
export default ChatPage;
