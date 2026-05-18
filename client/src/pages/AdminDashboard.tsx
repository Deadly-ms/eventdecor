
// import React, { useEffect, useRef, useState } from "react";
// import { useAuth } from "@clerk/clerk-react";

// import AdminMessages from "@/components/AdminMessages";

// const API_URL = "http://localhost:5000";

// type ImageDoc = {
//   _id: string;
//   title: string;
//   category: string;
//   url: string;
// };

// type ToastType = "success" | "error";

// const AdminDashboard = () => {
//   const { getToken } = useAuth();

//   const [images, setImages] = useState<ImageDoc[]>([]);
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("wedding");
//   const [loading, setLoading] = useState(false);

//   // Edit state
//   const [editId, setEditId] = useState<string | null>(null);
//   const [editTitle, setEditTitle] = useState("");
//   const [editCategory, setEditCategory] = useState("wedding");
//   const [editFile, setEditFile] = useState<File | null>(null);
//   const [editPreview, setEditPreview] = useState<string | null>(null);

//   // Toast
//   const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const editFileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const showToast = (message: string, type: ToastType) => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3000);
//   };

//   const fetchImages = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/images`);
//       const data = await res.json();
//       setImages(Array.isArray(data) ? data : []);
//     } catch {
//       showToast("Failed to load images", "error");
//     }
//   };

//   const upload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file || !title) return showToast("Title & image required", "error");

//     try {
//       setLoading(true);
//       const fd = new FormData();
//       fd.append("image", file);
//       fd.append("title", title);
//       fd.append("category", category);

//       const token = await getToken();

//       const res = await fetch(`${API_URL}/api/images`, {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: fd,
//       });

//       if (!res.ok) throw new Error();

//       setTitle("");
//       setCategory("wedding");
//       setFile(null);
//       setPreview(null);
//       if (fileInputRef.current) fileInputRef.current.value = "";

//       fetchImages();
//       showToast("Image uploaded", "success");
//     } catch {
//       showToast("Upload failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const update = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editId) return;

//     try {
//       setLoading(true);
//       const fd = new FormData();
//       fd.append("title", editTitle);
//       fd.append("category", editCategory);
//       if (editFile) fd.append("image", editFile);

//       const token = await getToken();

//       const res = await fetch(`${API_URL}/api/images/${editId}`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${token}` },
//         body: fd,
//       });

//       if (!res.ok) throw new Error();

//       setEditId(null);
//       setEditFile(null);
//       setEditPreview(null);
//       if (editFileInputRef.current) editFileInputRef.current.value = "";

//       fetchImages();
//       showToast("Image updated", "success");
//     } catch {
//       showToast("Update failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const remove = async (id: string) => {
//     if (!confirm("Delete this image?")) return;

//     try {
//       setLoading(true);
//       const token = await getToken();
//       await fetch(`${API_URL}/api/images/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       fetchImages();
//       showToast("Image deleted", "success");
//     } catch {
//       showToast("Delete failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">Admin Gallery</h1>

//         {/* Upload */}
//         <form onSubmit={upload} className="bg-white p-4 rounded shadow mb-8 grid md:grid-cols-5 gap-4">
//           <input
//             className="border p-2 rounded"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <select
//             className="border p-2 rounded"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option>wedding</option>
//             <option>birthday</option>
//             <option>party</option>
//             <option>corporate</option>
//           </select>

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const f = e.target.files?.[0];
//               if (!f) return;
//               setFile(f);
//               setPreview(URL.createObjectURL(f));
//             }}
//           />

//           {preview && (
//             <img src={preview} className="h-20 w-20 object-cover rounded border" />
//           )}

//           <button disabled={loading} className="bg-black text-white rounded">
//             {loading ? "Uploading..." : "Upload"}
//           </button>
//         </form>

//         {/* Gallery */}
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {images.map((img) => (
//             <div key={img._id} className="bg-white rounded shadow">
//               <img src={img.url} className="h-48 w-full object-cover" />
//               <div className="p-3">
//                 <h3 className="font-semibold">{img.title}</h3>
//                 <p className="text-sm text-gray-500">{img.category}</p>

//                 <div className="flex gap-2 mt-3">
//                   <button
//                     onClick={() => {
//                       setEditId(img._id);
//                       setEditTitle(img.title);
//                       setEditCategory(img.category);
//                       setEditPreview(img.url);
//                     }}
//                     className="flex-1 bg-blue-600 text-white py-1 rounded"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => remove(img._id)}
//                     className="flex-1 bg-red-600 text-white py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Edit Modal */}
//         {editId && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//             <form onSubmit={update} className="bg-white p-6 rounded w-96">
//               <h2 className="text-xl font-bold mb-4">Edit Image</h2>

//               <input
//                 className="border p-2 rounded w-full mb-2"
//                 value={editTitle}
//                 onChange={(e) => setEditTitle(e.target.value)}
//               />

//               <select
//                 className="border p-2 rounded w-full mb-2"
//                 value={editCategory}
//                 onChange={(e) => setEditCategory(e.target.value)}
//               >
//                 <option>wedding</option>
//                 <option>birthday</option>
//                 <option>party</option>
//                 <option>corporate</option>
//               </select>

//               {editPreview && (
//                 <img src={editPreview} className="h-32 w-full object-cover rounded mb-2" />
//               )}

//               <input
//                 ref={editFileInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const f = e.target.files?.[0];
//                   if (!f) return;
//                   setEditFile(f);
//                   setEditPreview(URL.createObjectURL(f));
//                 }}
//               />

//               <div className="flex justify-between mt-4">
//                 <button type="button" onClick={() => setEditId(null)} className="bg-gray-300 px-4 py-2 rounded">
//                   Cancel
//                 </button>

//                 <button className="bg-green-600 text-white px-4 py-2 rounded">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>

//       {/* Toast */}
//       {toast && (
//         <div className={`fixed bottom-6 right-6 px-4 py-2 rounded text-white ${
//           toast.type === "success" ? "bg-green-600" : "bg-red-600"
//         }`}>
//           {toast.message}
//         </div>
//       )}
//     </div>

//       <AdminMessages />
//     </>
//   );
// };

// export default AdminDashboard;









 import React, { useEffect, useRef, useState } from "react";
 import { useAuth } from "@clerk/clerk-react";
 import AdminMessages from "@/components/AdminMessages"
import AdminServices from "@/components/AdminServices";
 const API_URL = "http://localhost:8080"
 type ImageDoc = {
  _id: string;
  title: string;
  category: string;
  url: string;
};

type ServiceDoc = {
  _id: string;
  title: string;
  slug: string;
};


// type AdminTab = "images" | "messages";
type AdminTab = "images" | "messages" | "services";


const AdminDashboard = () => {
  const { getToken } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>("images");

  // ######################
  const [services, setServices] = useState<ServiceDoc[]>([]);


  // ================= IMAGES =================
  const [images, setImages] = useState<ImageDoc[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("wedding");
  const [loading, setLoading] = useState(false);

  // ================= EDIT =================
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("wedding");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);

  // ================= MESSAGE COUNT =================
  const [messageCount, setMessageCount] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
    fetchMessageCount();
    fetchServices(); //######################
  }, []);
// ############################################################
  // ================ SERVICE FETCH =================
  const fetchServices = async () => {
  const res = await fetch(`${API_URL}/api/admin/services`);
  const data = await res.json();
  setServices(Array.isArray(data) ? data : []);
};


  // ================= FETCH IMAGES =================
  const fetchImages = async () => {
    const res = await fetch(`${API_URL}/api/images`);
    const data = await res.json();
    setImages(Array.isArray(data) ? data : []);
  };

  // ================= FETCH MESSAGE COUNT =================
  const fetchMessageCount = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/admin/messages/count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessageCount(data.count || 0);
    } catch {
      setMessageCount(0);
    }
  };

  // ================= UPLOAD =================
  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("image", file);
      fd.append("title", title);
      fd.append("category", category);

      const token = await getToken();

      await fetch(`${API_URL}/api/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      setTitle("");
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      fetchImages();
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE =================
  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;

    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("title", editTitle);
      fd.append("category", editCategory);
      if (editFile) fd.append("image", editFile);

      const token = await getToken();

      await fetch(`${API_URL}/api/images/${editId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      setEditId(null);
      setEditFile(null);
      setEditPreview(null);
      if (editFileInputRef.current) editFileInputRef.current.value = "";

      fetchImages();
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const remove = async (id: string) => {
    if (!confirm("Delete this image?")) return;

    try {
      setLoading(true);
      const token = await getToken();

      await fetch(`${API_URL}/api/images/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchImages();
    } finally {
      setLoading(false);
    }
  };


  // ######################### autoselect ########################
  useEffect(() => {
  if (services.length && !category) {
    setCategory(services[0].slug);
  }
}, [services]);

useEffect(() => {
  if (services.length && editId && !editCategory) {
    setEditCategory(services[0].slug);
  }
}, [services, editId]);


  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-black text-white p-6 hidden md:block sticky top-0 h-screen">
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("images")}
            className={`w-full px-4 py-2 rounded text-left ${
              activeTab === "images" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            🖼 Image Manager
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full px-4 py-2 rounded flex justify-between ${
              activeTab === "messages" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            <span>💬 User Messages</span>
            {messageCount > 0 && (
              <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {messageCount}
              </span>
            )}
          </button>


          <button
            onClick={() => setActiveTab("services")}
            className={`w-full px-4 py-2 rounded text-left ${
              activeTab === "services" ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            🛠 Services
          </button>

        </nav>
      </aside>

      {/* ================= CONTENT ================= */}
       <main className="flex-1 p-6">

 {/* -------- MOBILE TABS -------- */}
       <div className="flex gap-4 mb-6 md:hidden">
          <button
            onClick={() => setActiveTab("images")}
            className={`flex-1 py-2 rounded ${
              activeTab === "images"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Images
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`flex-1 py-2 rounded ${
              activeTab === "services"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Services
          </button>

           <button
            onClick={() => setActiveTab("messages")}
            className={`flex-1 py-2 rounded flex items-center justify-center gap-2 ${
              activeTab === "messages"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Messages
            {messageCount > 0 && (
              <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {messageCount}
              </span>
            )}
          </button>
        </div>
         {/* ================= IMAGE TAB ================= */}
        {activeTab === "images" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Gallery Manager</h1>

            {/* UPLOAD */}
            <form
              onSubmit={upload}
              className="bg-white p-6 rounded shadow mb-8 grid md:grid-cols-4 gap-4"
            >
              <input
                className="border p-2 rounded"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* <select
                className="border p-2 rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>wedding</option>
                <option>birthday</option>
                <option>party</option>
                <option>corporate</option>
              </select> */}

              <select
  className="border p-2 rounded"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Service</option>

  {services.map((service) => (
    <option key={service._id} value={service.slug}>
      {service.title} ({service.slug})
    </option>
  ))}
</select>


               <input
               className="bg-gray-200 p-5 border object-cover rounded"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setFile(f);
                  setPreview(URL.createObjectURL(f));
                }}
              />

             {preview && (
               <img src={preview} className="h-20 w-20 object-cover rounded border md:ml-20" />
              )}

              <button disabled={loading} className="bg-black p-5 text-white rounded">
                {loading ? "Uploading..." : "Upload"}
              </button>
            </form>

            {/* GALLERY */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((img) => (
                <div key={img._id} className="bg-white rounded shadow">
                  <img src={img.url} className="h-48 w-full object-cover" />
                  <div className="p-3">
                    <h3 className="font-semibold">{img.title}</h3>
                    <p className="text-sm text-gray-500">{img.category}</p>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          setEditId(img._id);
                          setEditTitle(img.title);
                          setEditCategory(img.category);
                          setEditPreview(img.url);
                        }}
                        className="flex-1 bg-black text-white py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => remove(img._id)}
                        className="flex-1 bg-black text-white py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= MESSAGE TAB ================= */}
        {activeTab === "messages" && <AdminMessages />}

        {/* ================= SERVICES TAB ================= */}
        {activeTab === "services" && <AdminServices />}

      </main>

      {/* ================= EDIT MODAL ================= */}
      {/* {editId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={update} className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Edit Image</h2>

            <input
              className="border p-2 rounded w-full mb-2"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <select
              className="border p-2 rounded w-full mb-2"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
            <option value="">Select Service</option>

  {services.map((service) => (
    <option key={service._id} value={service.slug}>
      {service.title} ({service.slug})
    </option>
  ))}
</select>


            {editPreview && (
              <img
                src={editPreview}
                className="h-32 w-full object-cover rounded mb-2"
              />
            )}

            <input
            className="bg-gray-200 p-5 border object-cover rounded"
              ref={editFileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setEditFile(f);
                setEditPreview(URL.createObjectURL(f));
              }}
            />

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setEditId(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </form>
        </div>
      )} */}


      {editId && (
  <div className="fixed inset-0 z-50 flex justify-center items-start bg-black/40 backdrop-blur-sm">

    {/* POPUP CARD */}
    <form
      onSubmit={update}
      className="
        mt-20
        w-[95%] max-w-lg
        bg-white
        rounded-xl
        shadow-2xl
        p-6
        animate-slideDown
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Edit Image</h2>

        <button
          type="button"
          onClick={() => setEditId(null)}
          className="text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>

      {/* TITLE */}
      <label className="block text-sm font-medium mb-1">Title</label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
      />

      {/* CATEGORY */}
      <label className="block text-sm font-medium mb-1">Service Category</label>
      <select
        className="border p-2 rounded w-full mb-3"
        value={editCategory}
        onChange={(e) => setEditCategory(e.target.value)}
      >
        <option value="">Select Service</option>
        {services.map((service) => (
          <option key={service._id} value={service.slug}>
            {service.title} ({service.slug})
          </option>
        ))}
      </select>

      {/* PREVIEW */}
      {editPreview && (
        <img
          src={editPreview}
          className="h-40 w-full object-cover rounded mb-3 border"
        />
      )}

      {/* FILE INPUT */}
      <label className="block text-sm font-medium mb-1">Replace Image</label>
      <input
        ref={editFileInputRef}
        type="file"
        accept="image/*"
        className="w-full bg-gray-100 p-3 rounded border"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          setEditFile(f);
          setEditPreview(URL.createObjectURL(f));
        }}
      />

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => setEditId(null)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 rounded bg-black text-white hover:bg-gray-800"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
)}

    </div>
  );
};

export default AdminDashboard;
