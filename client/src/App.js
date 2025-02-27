import {BrowserRouter as Router , Routes , Route} from "react-router-dom"

import './App.css';
import Login from "./components/LoginForm";
import Register from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/navbar";
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    
    <Router>
      <Toaster position="top-center" />
      <Navbar/>
      <Routes>
          <Route path="/" element = {<Login/>} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/dashboard" element = {<Dashboard/>} />

      </Routes>

    </Router>

  );
}

export default App;
