import './App.css';
import axios from './axios'
import MediaCard from './MediaCard'
import React, { useEffect, useState } from 'react'


function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await axios.get('/assets')
      localStorage.setItem('dataCollect', JSON.stringify(res.data))
      setData(res.data)
      console.log(res.data)
    }
    getData()
  }, [])

  const deleteHandle=(id)=>{
    const newData=data.filter((element)=>id!==element.id)
    setData(newData)
    console.log(data.length,newData.length)
  }

  return (
    <div className="App">
      <div className="header">KUTUKI</div>
      <MediaCard data={data} deleteHandle={deleteHandle}/>
    </div>
  );
}

export default App;
