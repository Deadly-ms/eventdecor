
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8080";

type Message = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
  replied: boolean;
};

const AdminMessages = () => {
  const { getToken } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Reply modal
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [subject, setSubject] = useState("");
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${API_URL}/api/admin/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const deleteMessage = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      setDeletingId(id);
      const token = await getToken();

      await axios.delete(`${API_URL}/api/admin/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success("Message deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  // ✅ SEND REPLY
  const sendReply = async () => {
    if (!replyTo || !subject || !replyText) {
      toast.error("Subject & reply required");
      return;
    }

    try {
      setSending(true);
      const token = await getToken();

      await axios.post(
        `${API_URL}/api/admin/messages/${replyTo._id}/reply`,
        { subject, reply: replyText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Reply sent");

      // update UI
      setMessages((prev) =>
        prev.map((m) =>
          m._id === replyTo._id ? { ...m, replied: true } : m
        )
      );

      setReplyTo(null);
      setSubject("");
      setReplyText("");
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="p-10">Loading messages...</p>;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Contact Messages</h2>

      {messages.map((msg) => (
        <div key={msg._id} className="bg-white p-5 rounded shadow mb-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">{msg.name}</h4>

            {/* STATUS BADGE */}
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                msg.replied
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {msg.replied ? "Replied" : "Not replied"}
            </span>
          </div>

          <p className="text-sm text-gray-600">{msg.email}</p>
          <p className="mt-2">{msg.message}</p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setReplyTo(msg)}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Reply
            </button>

            <button
              onClick={() => deleteMessage(msg._id)}
              disabled={deletingId === msg._id}
              className="bg-red-600 text-white px-4 py-1 rounded disabled:opacity-60"
            >
              {deletingId === msg._id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}

      {/* REPLY MODAL */}
      {replyTo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-bold mb-3">
              Reply to {replyTo.email}
            </h3>

            <input
              className="border p-2 w-full mb-2"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
              className="border p-2 w-full h-32"
              placeholder="Your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setReplyTo(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={sendReply}
                disabled={sending}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
