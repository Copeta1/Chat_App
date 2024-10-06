import useGetMessages from "../../hooks/useGetMessages";
import MessageSleleton from "../skeletons/MessageSleleton";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log("messages:", messages);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSleleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;

// STARTER CODE FOR THE MESSAGES COMPONENT
// import Message from "./Message";

// const Messages = () => {
//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//       <Message />
//     </div>
//   );
// };

// export default Messages;
