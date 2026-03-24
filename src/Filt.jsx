import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, PlusCircle, Image as ImageIcon, X } from 'lucide-react';

const Filt = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [inputs, setInputs] = useState({
    title: "",
    num: "",
    desc: "",
<<<<<<< HEAD
    info: []
=======
    info :[]
>>>>>>> 48ed5feba8c8f4c5fb8d6f350d120ed1c177d3cf
  });

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  // File upload
  const fileHandler = (e) => {
<<<<<<< HEAD
    const files = Array.from(e.target.files);

    const newEntries = files.map(file => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file)
    }));

    setInputs(prev => ({
      ...prev,
      info: [...prev.info, ...newEntries]
    }));

    e.target.value = null;
  };

  // Remove image from form
  const removeImageFromForm = (id, url) => {
    URL.revokeObjectURL(url);
    setInputs(prev => ({
      ...prev,
      info: prev.info.filter(item => item.id !== id)
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.title || inputs.info.length === 0) {
      return alert("Title and Image required!");
    }

    const newItem = {
      title: inputs.title,
      num: inputs.num,
      desc: inputs.desc,
      info: inputs.info.map(img => ({
        id: img.id,
        preview: img.preview
      })),
      id: crypto.randomUUID(),
      createdAt: new Date().toLocaleDateString()
    };

    setData(prev => [newItem, ...prev]);

    setInputs({
      title: "",
      num: "",
      desc: "",
      info: []
    });
  };

  // Delete entry
  const deleteEntry = (id) => {
    const item = data.find(d => d.id === id);
    item?.info.forEach(img => URL.revokeObjectURL(img.preview));
    setData(prev => prev.filter(d => d.id !== id));
  };
=======
    const file = e.target.files[0];
    if (file) {
      const newfile = {file : file, preview : URL.createObjectURL(file)}
     setInputs(prev => ({
        ...prev , info: [...prev.info , {...newfile} ]
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!inputs.title || !inputs.num || !inputs.desc || !inputs.preview) {
    //   return alert("Please fill all fields and upload an image.");
    // }

    const newItem = { ...inputs, id: Date.now() }; // Unique ID for keys
    setData([newItem, ...data]);
    setInputs({ title: "", num: "", desc: "", info : [] });

    console.log(inputs)
  };

  // Delete item

>>>>>>> 48ed5feba8c8f4c5fb8d6f350d120ed1c177d3cf

  // Filter
  const filteredItems = data.filter(item =>
    [item.title, item.desc, item.num].some(field =>
      (field || "").toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* FORM */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-[380px]">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl sticky top-8">

=======
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-slate-900 text-slate-200 p-4 md:p-8 font-sans">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* LEFT COLUMN: FORM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-[380px] shrink-0"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl sticky top-8">
>>>>>>> 48ed5feba8c8f4c5fb8d6f350d120ed1c177d3cf
            <div className="flex items-center gap-3 mb-6">
              <PlusCircle className="text-indigo-400" />
              <h1 className="text-xl font-bold text-white">New Entry</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="title"
                value={inputs.title}
                onChange={handleChange}
                placeholder="Project Title"
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
              />

              <input
                name="num"
                value={inputs.num}
                onChange={handleChange}
                placeholder="Phone / ID"
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
              />

<<<<<<< HEAD
              <textarea
                name="desc"
                value={inputs.desc}
                onChange={handleChange}
                placeholder="Description"
                rows="3"
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
              />

              {/* Upload */}
              <div>
                <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-4 text-center hover:border-indigo-500">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={fileHandler}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <ImageIcon className="mx-auto text-slate-500 mb-1" />
                  <p className="text-xs text-slate-400">Click to upload images</p>
                </div>

                {/* Preview */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {inputs.info.map(img => (
                    <div key={img.id} className="relative w-16 h-16">
                      <img src={img.preview} alt="" className="w-full h-full object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImageFromForm(img.id, img.preview)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full bg-indigo-600 py-3 rounded-xl font-bold">
=======
              <div className="relative group">
                <input type="file" multiple onChange={fileHandler} placeholder='Image' />
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95">
>>>>>>> 48ed5feba8c8f4c5fb8d6f350d120ed1c177d3cf
                Add to Gallery
              </button>
            </form>
          </div>
        </motion.div>

        {/* LIST */}
        <div className="flex-1 space-y-6">
<<<<<<< HEAD

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
=======
          {/* SEARCH BAR */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors" size={20} />
>>>>>>> 48ed5feba8c8f4c5fb8d6f350d120ed1c177d3cf
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10"
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
<<<<<<< HEAD
            <AnimatePresence>
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden group"
                >
=======
            <AnimatePresence mode='popLayout'>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    whileHover={{ y: -5 }}
                    className="group relative bg-slate-800/40 border border-slate-700/50 rounded-3xl overflow-hidden backdrop-blur-sm"
                  >
                    {/* <div className="relative h-48 w-full overflow-hidden">

                      <img src={item.preview} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Card" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="absolute top-3 right-3 p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div> */}

                    <div>
                      {
                        item.info.map((e, i)=>{
                          return <div key={i}>
                            <img src={e.preview} alt="" />
                          </div>
                        })
                      }


                    </div>
>>>>>>> 48ed5feba8c8f4c5fb8d6f350d120ed1c177d3cf

                  {/* IMAGE GRID */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                    {item.info.map(img => (
                      <div key={img.id} className="overflow-hidden">
                        <img
                          src={img.preview}
                          alt=""
                          onClick={() => setSelectedImage(img.preview)}
                          className="w-full h-32 object-cover cursor-pointer group-hover:scale-110 transition"
                        />
                      </div>
                    ))}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 relative">
                    <button
                      onClick={() => deleteEntry(item.id)}
                      className="absolute top-5 right-5 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>

                    <h2 className="text-lg font-bold text-white pr-8">
                      {item.title}
                    </h2>

                    <p className="text-indigo-400 text-xs mt-1">
                      {item.num}
                    </p>

                    <p className="text-slate-400 text-sm mt-3 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt=""
              className="max-w-[90%] max-h-[90%] rounded-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white text-2xl"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Filt;