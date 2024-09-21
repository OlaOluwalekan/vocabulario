import Link from "next/link";

const ChatList = ({
  data,
}: {
  data: {
    title: string;
    context: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}) => {
  return (
    <div className="w-full h-full text-left">
      {data.map((chat) => {
        return (
          <div key={chat.id} className="border-b-[1px] border-blue-600/50">
            <Link
              href={`/chat/${chat.id}`}
              className="text-primary font-semibold text-lg leading-10"
            >
              {chat.title}
            </Link>
            <p className="leading-8">{chat.context}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
