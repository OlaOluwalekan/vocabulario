"use client";

import Chat from "./Chat";

const ChatArea = ({
  data,
}: {
  data: {
    id: string;
    content: string;
    response: string;
    contentTranslation: string;
    responseTranslation: string;
  }[];
}) => {
  return (
    <div className="h-[calc(100vh-190px)] flex flex-col gap-2 overflow-auto scrollbar-thin">
      {data.length == 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          No chat yet
        </div>
      ) : (
        data.map((item) => {
          return (
            <div key={item.id} className="w-full">
              <Chat {...item} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatArea;
