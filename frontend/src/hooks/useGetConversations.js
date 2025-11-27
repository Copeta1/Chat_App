import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_BASE_URL =
  import.meta.env.VITE_APP_API_URL || "http://localhost:3001";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const authUser = JSON.parse(localStorage.getItem("chat-user"));
        const token = authUser?.token;
        if (token) {
          console.log(
            "✅ FRONTEND LOG: Token pronađen, pokušavam dohvaćanje korisnika..."
          );
        } else {
          console.log(
            "❌ FRONTEND LOG: Token nije pronađen. Korisnik nije prijavljen."
          );
        }

        if (!token) {
          setConversations([]);
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status !== 200) {
          console.log(`⚠️ FRONTEND LOG: Status odgovora je ${res.status}.`);
        }

        const data = await res.json();

        if (data.error) {
          if (res.status === 401) {
            throw new Error(
              "Unauthorized or Token Expired. Please log in again."
            );
          }
          throw new Error(data.error);
        }
        console.log(
          `✅ FRONTEND LOG: Uspješno dohvaćeno ${data.length} korisnika za Sidebar.`
        );

        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
