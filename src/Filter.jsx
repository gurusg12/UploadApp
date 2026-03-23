import React, { useState } from 'react'

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
          <div>
              <input className='placeholder:bg-slate-500' type="text" placeholder='text'  onChange={Item} />

            {obj.map((e,i)=>{
                return <div key={i}>
                    <div>
                        <img src={e.preview} alt="" />
                    </div>
                    <div>{e.title}</div>
                    <div>{e.desc}</div>
                </div>
            })}

          </div>
        </div>
    )
}

export default Filter
