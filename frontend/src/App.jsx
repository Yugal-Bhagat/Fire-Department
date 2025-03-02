// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NotFound from "./pages/NotFound";
import ApplyNOC from "./pages/NOC/ApplyNOC";
import TrackNOC from "./pages/NOC/TrackNOC";
import EmergencyContact from "./pages/EmergencyContact";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navigation for switching between pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/apply-noc" element={<ApplyNOC />} />
        <Route path="/track-application" element={<TrackNOC/>} />
        <Route path="/emergency-contact" element={<EmergencyContact/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
