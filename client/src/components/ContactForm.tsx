import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Name, Email & Message are required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/contact", form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 XXXXX XXXXX"
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Message *</label>
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your event..."
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
        />
      </div>

      <button
        disabled={loading}
        className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
