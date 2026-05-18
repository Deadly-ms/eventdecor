import { useEffect, useState, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";

const API = "http://localhost:8080";

export default function AdminServices() {
  const { getToken } = useAuth();

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    features: ""
  });

  const [hero, setHero] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

  const heroRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const fetchServices = async () => {
    const token = await getToken();
    const res = await fetch(`${API}/api/admin/services`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setServices(await res.json());
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ================= CREATE =================
  const create = async () => {
    if (!hero) {
      toast.error("Hero image required");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("slug", form.slug);
      fd.append("description", form.description);
      fd.append(
        "features",
        JSON.stringify(form.features.split(","))
      );

      fd.append("heroImage", hero);
      gallery.forEach(img => fd.append("gallery", img));

      await fetch(`${API}/api/admin/services`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });

      toast.success("Service created");

      setForm({ title: "", slug: "", description: "", features: "" });
      setHero(null);
      setGallery([]);
      setHeroPreview(null);
      setGalleryPreview([]);

      if (heroRef.current) heroRef.current.value = "";
      if (galleryRef.current) galleryRef.current.value = "";

      fetchServices();
    } catch {
      toast.error("Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    const token = await getToken();
    await fetch(`${API}/api/admin/services/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    toast.success("Service deleted");
    fetchServices();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Services Manager</h1>

      {/* CREATE */}
      <div className="bg-white p-4 rounded shadow mb-6 grid gap-3">
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Slug (wedding)"
          value={form.slug}
          onChange={e => setForm({ ...form, slug: e.target.value })}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Features (comma separated)"
          value={form.features}
          onChange={e => setForm({ ...form, features: e.target.value })}
          className="border p-2 rounded"
        />

        {/* HERO IMAGE */}
        <input
        className="bg-gray-200 p-5 border object-cover rounded"
          ref={heroRef}
          type="file"
          accept="image/*"
          onChange={e => {
            const f = e.target.files?.[0];
            if (!f) return;
            setHero(f);
            setHeroPreview(URL.createObjectURL(f));
          }}
        />

        {heroPreview && (
          <img
            src={heroPreview}
            className="h-32 w-full object-cover rounded"
          />
        )}

        {/* GALLERY */}
        <input
          className="bg-gray-200 p-5 border object-cover rounded"
          ref={galleryRef}
          type="file"
          multiple
          accept="image/*"
          onChange={e => {
            const files = Array.from(e.target.files || []);
            setGallery(files);
            setGalleryPreview(files.map(f => URL.createObjectURL(f)));
          }}
        />

        <div className="grid grid-cols-3 gap-2">
          {galleryPreview.map((img, i) => (
            <img key={i} src={img} className="h-24 w-full object-cover rounded" />
          ))}
        </div>

        <button
          disabled={loading}
          onClick={create}
          className="bg-black text-white p-2 rounded"
        >
          {loading ? "Creating..." : "Add Service"}
        </button>
      </div>

      {/* LIST */}
      {services.map(s => (
        <div
          key={s._id}
          className="bg-white p-4 mb-3 rounded shadow flex justify-between"
        >
          <div>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-500">/{s.slug}</p>
          </div>
{/* ################################################################ */}

         <div>

         </div>
          <div className="flex gap-2">
            <Link
              to={`/admin/services/edit/${s._id}`}
              className="bg-black text-white px-3 py-1 rounded">
              Edit
            </Link>

            <button
              onClick={() => remove(s._id)}
              className="bg-red-600 text-white px-3 rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

