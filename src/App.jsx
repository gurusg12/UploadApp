import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const [docs, setdocs] = useState({
    Title: "",
    Desc: "",
    file: null,
    preview: null
  });

  const change = (e) => {
    setdocs({
      ...docs,
      [e.target.name]: e.target.value
    });
  };

  const files = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setdocs({
      ...docs,
      file: file,
      preview: URL.createObjectURL(file)
    });
  };

  function Submits(e) {
    e.preventDefault();

    if (!docs.Title || !docs.file) {
      alert("Title and file are required");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const item = {
        id: Date.now(),
        ...docs
      };

      setdata((p) => [...p, item]);

      setdocs({
        Title: "",
        Desc: "",
        file: null,
        preview: null
      });

      setLoading(false);
    }, 500);
  }

  useEffect(() => {
    return () => {
      if (docs.preview) URL.revokeObjectURL(docs.preview);
    };
  }, [docs.preview]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Upload Card */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Upload Content
        </h2>

        <form onSubmit={Submits} className="flex flex-col gap-4">

          <input
            type="text"
            name="Title"
            placeholder="Enter title"
            value={docs.Title}
            onChange={change}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="Desc"
            placeholder="Enter description"
            value={docs.Desc}
            onChange={change}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* File Upload */}
          <label className="cursor-pointer border-2 border-dashed border-gray-300 p-4 text-center rounded-lg hover:bg-gray-50 transition">
            <span className="text-gray-500">Click to upload file</span>
            <input type="file" onChange={files} className="hidden" />
          </label>

          {/* Preview */}
          {docs.preview && (
            <div className="mt-2">
              <img
                src={docs.preview}
                alt="preview"
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Data Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {item.preview && (
              <img
                src={item.preview}
                alt=""
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.Title}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.Desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App