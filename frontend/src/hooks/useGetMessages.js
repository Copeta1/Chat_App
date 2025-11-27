import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const API_BASE_URL =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3001";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        if (!selectedConversation?._id) {
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
          `${API_BASE_URL}/api/messages/${selectedConversation._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
