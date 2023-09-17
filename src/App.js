import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
export default function App() {
  return (
    <BrowserRouter>
      <div style={{textAlign:"center"}}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}