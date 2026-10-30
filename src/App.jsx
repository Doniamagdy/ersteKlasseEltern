import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./shared/Layout/Layout";
import Home from "./modules/Home/Home"
import Essen from "./modules/Essen/Essen"
import Farben from "./modules/Farben/Farben"
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/essen" element={<Essen />} />
                <Route path="/farben" element={<Farben />} />

      </Route>
    </Routes>
  );
}

export default App;
