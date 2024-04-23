import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./komponente/Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./stranice/Home";
import About from "./stranice/About";
import Player from "./stranice/Player";
import Login from "./stranice/Login";
import Register from "./stranice/Register";

function App() {
  return (
    <div className="App">
      <Navigation />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/player" element={<Player />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;