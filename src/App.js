/*eslint-disable*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import QRscan from './pages/QRscanner'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scanner" element={<QRscan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
