const page = ({ params }: { params: { chatId: string } }) => {
  return <div>{params.chatId}</div>;
};

export default page;
