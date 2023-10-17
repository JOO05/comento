import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./components/common/Layout";
import NotFound404 from "./pages/NotFound404";
import Home from './pages/Home';
import Best from './pages/Best';
import Special from './pages/Special';
import New from './pages/New';
import Cheap from './pages/Cheap';
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [data,setData] = useState([])

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
    .then((res) => {
      setData(res.data.products)
    })
  },[])

  // useEffect(() => {
  //   console.log(data); // This will log the updated data when it changes
  // }, [data]);
  return (
    <BrowserRouter>
    <Layout>     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New data={data && data} />} />
        <Route path="/best" element={<Best />} />
        <Route path="/cheap" element={<Cheap />} />
        <Route path="/special" element={<Special />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>   
    </Layout>
    </BrowserRouter>
  );
}