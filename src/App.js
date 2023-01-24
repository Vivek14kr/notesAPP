import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
import Bookmarked from './components/Bookmarked';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarked" element={<Bookmarked />} />
      </Routes>
    </div>
  );
}

export default App;
