import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UploadCloud, Trash2, PlusCircle, Image as ImageIcon } from 'lucide-react';

const Filter = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputs, setInputs] = useState({
    title: "",
    num: "",
    desc: "",
    files: [],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  // Handle file uploads (multiple)
  const fileHandler = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = files.map(file => ({
      image: file,
      preview: URL.createObjectURL(file),
    }));

    setInputs(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !inputs.title ||
      !inputs.num ||
      !inputs.desc ||
      inputs.files.length === 0
    ) {
      return alert("Please fill all fields and upload at least one image.");
    }

    const newItem = {
      ...inputs,
      id: Date.now(),
    };

    setData(prev => [newItem, ...prev]);

    // Reset form
    setInputs({
      title: "",
      num: "",
      desc: "",
      files: [],
    });
  };

  // Delete item
  const deleteItem = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  // Filter logic
  const filteredItems = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.num.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-4 md:p-8">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-[380px]"
        >
          <div className="bg-white/5 p-8 rounded-3xl">

            <div className="flex items-center gap-3 mb-6">
              <PlusCircle />
              <h1 className="text-2xl font-bold">Create Entry</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-3 rounded-xl bg-slate-800"
              />

              <input
                type="text"
                name="num"
                value={inputs.num}
                onChange={handleChange}
                placeholder="Phone / ID"
                className="w-full p-3 rounded-xl bg-slate-800"
              />

              <textarea
                name="desc"
                value={inputs.desc}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 rounded-xl bg-slate-800"
              />

              {/* File Upload */}
              <input
                type="file"
                multiple
                onChange={fileHandler}
                className="w-full"
              />

              {/* Preview */}
              {inputs.files.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {inputs.files.map((f, i) => (
                    <img
                      key={i}
                      src={f.preview}
                      className="h-20 w-20 object-cover rounded-lg"
                      alt="preview"
                    />
                  ))}
                </div>
              )}

              <button className="w-full bg-indigo-600 py-3 rounded-xl">
                Add
              </button>
            </form>
          </div>
        </motion.div>

        {/* LIST */}
        <div className="flex-1">

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full p-4 rounded-xl bg-slate-800"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-slate-800 rounded-2xl overflow-hidden"
                  >



                    <div>
                        {item.files.map((e ,i)=>{
                            return <div key={i}>
                                <img src={e.preview} alt="" />
                            </div>
                        })}
                    </div>







                    {/* Image (first image) */}
                    {/* <img
                      src={item.files[0]?.preview}
                      className="h-48 w-full object-cover"
                      alt="card"
                    /> */}

                    <div className="p-4">
                      <h2 className="text-xl font-bold">{item.title}</h2>
                      <p>{item.num}</p>
                      <p className="text-sm">{item.desc}</p>

                      <button
                        onClick={() => deleteItem(item.id)}
                        className="mt-3 bg-red-500 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <ImageIcon size={40} />
                  <p>No data found</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;