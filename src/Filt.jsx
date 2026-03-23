import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UploadCloud, Trash2, PlusCircle, Image as ImageIcon } from 'lucide-react';

const Filt = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputs, setInputs] = useState({
    title: "",
    num: "",
    desc: "",
    file: null,
    preview: null
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  // Handle file uploads
  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputs(prev => ({
        ...prev,
        file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.title || !inputs.num || !inputs.desc || !inputs.preview) {
      return alert("Please fill all fields and upload an image.");
    }

    const newItem = { ...inputs, id: Date.now() }; // Unique ID for keys
    setData([newItem, ...data]);
    setInputs({ title: "", num: "", desc: "", file: null, preview: null });
  };

  // Delete item
  const deleteItem = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  // Filter logic (Computed directly during render for better sync)
  const filteredItems = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.num.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-indigo-950 to-slate-900 text-slate-200 p-4 md:p-8 font-sans">
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: FORM */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-[380px] shrink-0"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <PlusCircle className="text-indigo-400" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Create Entry
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={inputs.title}
                  onChange={handleChange}
                  placeholder="e.g. Project Alpha"
                  className="w-full p-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Phone / ID</label>
                <input
                  type="text"
                  name="num"
                  value={inputs.num}
                  onChange={handleChange}
                  placeholder="e.g. +1 234..."
                  className="w-full p-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 ml-1">Description</label>
                <textarea
                  name="desc"
                  rows="3"
                  value={inputs.desc}
                  onChange={handleChange}
                  placeholder="Describe your entry..."
                  className="w-full p-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none resize-none"
                />
              </div>

              <div className="relative group">
                <input type="file" onChange={fileHandler} id="file-upload" className="hidden" />
                <label 
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-2xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-500/5 transition-all group"
                >
                  {inputs.preview ? (
                    <img src={inputs.preview} className="h-full w-full object-cover rounded-2xl" alt="Preview" />
                  ) : (
                    <div className="flex flex-col items-center text-slate-400 group-hover:text-indigo-400">
                      <UploadCloud className="mb-2" size={28} />
                      <span className="text-sm">Upload Cover Image</span>
                    </div>
                  )}
                </label>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95">
                Add to Gallery
              </button>
            </form>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: LIST */}
        <div className="flex-1 space-y-6">
          {/* SEARCH BAR */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors" size={20} />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, number, or description..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all text-lg"
            />
          </motion.div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                    <div className="relative h-48 w-full overflow-hidden">
                      <img src={item.preview} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Card" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      <button 
                        onClick={() => deleteItem(item.id)}
                        className="absolute top-3 right-3 p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="p-5">
                      <h2 className="text-xl font-bold text-white truncate">{item.title}</h2>
                      <p className="text-indigo-400 text-sm font-medium mt-1 mb-3">{item.num}</p>
                      <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <ImageIcon className="mx-auto text-slate-700 mb-4" size={48} />
                  <p className="text-slate-500 text-lg">No entries found matching your search.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filt;