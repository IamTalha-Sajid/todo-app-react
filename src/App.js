import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Login from "./Login";
import Todo from "./Todo";
import History from "./History"

function App() {
    return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/Todo" element={<Todo/>}/>
            <Route exact path="/History" element={<History/>}/>
        </Routes>
    </Router>
    );
}

export default App;
