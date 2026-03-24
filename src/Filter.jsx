import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UploadCloud, Trash2, PlusCircle, Image as ImageIcon } from 'lucide-react';

const Filter = () => {
    // const data = [{ title: "Guru", desc: "somthing", Num: 9972006054 }, { title: "mallu", desc: "somthing wennt right ", Num: 9632367397 }]
    const[items , setitems] = useState([])
    const[obj , setobj] = useState([])
    const Item = (g)=>{
        const Value = g.target.value.toLowerCase().trim()
        setobj(items.filter((G)=>(
            G.title.toLowerCase().includes(Value) || G.desc.toLowerCase().includes(Value)
        )))}
const[data , setdata] = useState({title : "" , desc : "" , file : null , preview :null})
function change (r){
    setdata({...data , [r.target.name] : r.target.value})
    console.log(data)
}
function file (h){
    const files = h.target.files[0] 
    setdata({...data , file : files , preview : URL.createObjectURL(files)})}
function submit(H){
    H.preventDefault()
    if(data.title.length === 0|| data.file === null || data.preview === null|| data.desc.length === 0){
        return alert("")
    }
    setitems((d)=>([...d , {...data}]))
    setdata({title : "" , desc : "" , file : null , preview :null})
    console.log(data)
    console.log(items)
}
    return (
        <div className='text-slate-100 bg-slate-900 h-screen w-screen'>
            <div className='bg-emerald-600'>
                <form action="" onSubmit={submit}>
                    <input type="text" placeholder='title' name='title' onChange={change} />
                    <input type="text" placeholder='desc' name='desc' onChange={change} />
                    <input type="file" placeholder='Files' accept='image/*' onChange={file} />
                    <button type='submit'>submit</button>


                </form>
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