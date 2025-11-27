import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const API_BASE_URL =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3001";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      if (!selectedConversation?._id) {
        toast.error("No conversation selected.");
        setLoading(false);
        return;
      }

      const authUser = JSON.parse(localStorage.getItem("chat-user"));
      const token = authUser?.token;

      if (!token) {
        toast.error("Authentication token missing. Please log in.");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${API_BASE_URL}/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();

      if (data.error) {
        if (res.status === 401) {
          throw new Error(
            "Unauthorized or Token Expired. Please log in again."
          );
        }
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
