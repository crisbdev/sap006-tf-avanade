/*eslint-disable*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRscan from "./pages/qrscanner/QRscanner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QRscan />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
