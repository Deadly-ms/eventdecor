import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const API = "http://localhost:8080";

export default function AdminEditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [service, setService] = useState<any>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    features: ""
  });

  const [hero, setHero] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);

  const heroRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  // ================= LOAD SERVICE =================
  useEffect(() => {
    fetch(`${API}/api/admin/services`)
      .then(res => res.json())
      .then(data => {
        const s = data.find((x: any) => x._id === id);
        setService(s);
        setForm({
          title: s.title,
          slug: s.slug,
          description: s.description,
          features: s.features.join(",")
        });
      });
  }, [id]);

  // ================= UPDATE =================
  const updateService = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const fd = new FormData();

      fd.append("title", form.title);
      fd.append("slug", form.slug);
      fd.append("description", form.description);
      fd.append("features", JSON.stringify(form.features.split(",")));

      if (hero) fd.append("heroImage", hero);
      gallery.forEach(img => fd.append("gallery", img));

      await fetch(`${API}/api/admin/services/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });

      toast.success("Service updated");
      navigate("/admin");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!service) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Edit Service</h1>

      <div className="bg-white p-6 rounded shadow grid gap-3">

        <input
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="border p-2 rounded"
          placeholder="Title"
        />

        <input
          value={form.slug}
          onChange={e => setForm({ ...form, slug: e.target.value })}
          className="border p-2 rounded"
          placeholder="Slug"
        />

        <textarea
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
          placeholder="Description"
        />

        <input
          value={form.features}
          onChange={e => setForm({ ...form, features: e.target.value })}
          className="border p-2 rounded"
          placeholder="Features (comma separated)"
        />

        {/* HERO IMAGE */}
        <p className="font-semibold mt-3">Hero Image</p>
        <img src={service.heroImage} className="h-40 rounded object-cover" />

        <input
          ref={heroRef}
          type="file"
          accept="image/*"
          onChange={e => setHero(e.target.files?.[0] || null)}
        />

        {/* GALLERY */}
        <p className="font-semibold mt-3">Gallery</p>
        <div className="grid grid-cols-3 gap-2">
          {service.gallery.map((img: string, i: number) => (
            <img key={i} src={img} className="h-24 rounded object-cover" />
          ))}
        </div>

        <input
          ref={galleryRef}
          type="file"
          multiple
          accept="image/*"
          onChange={e => setGallery(Array.from(e.target.files || []))}
        />

        <button
          disabled={loading}
          onClick={updateService}
          className="bg-black text-white py-2 rounded mt-4"
        >
          {loading ? "Updating..." : "Update Service"}
        </button>
      </div>
    </div>
  );
}
