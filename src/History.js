import React, {useEffect} from 'react';
import logo from './todo-list.svg';
import darkLogo from "./todo-list-dark.svg";
import {DarkModeSwitch} from 'react-toggle-dark-mode';
import {toast, ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import './App.css';


function History() {

    const navigate = useNavigate();

    const [isDarkMode, setDarkMode] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [userHistory, setUserHistory] = React.useState("");

    useEffect(() => {
        }, [isDarkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    const goBack = () => {
        navigate('/Todo')
    }

    const clearHistory = () => {

    }

    return (
            <div className={isDarkMode === true ? 'main-div' : 'main-div-dark'}>
                <div className="dark-mode">
                    <DarkModeSwitch style={{marginBottom: '2rem', alignItems: 'right', padding: '10px', margin: '20px'}}
                        checked={isDarkMode} onChange={toggleDarkMode} size={40} sunColor='#fff'
                        moonColor='#2d5354'/>
                </div>
                <ToastContainer/>
                <div className="center-div">
                    <figure>
                        <img className="logo" src={isDarkMode === true ? logo : darkLogo} alt="Todo List"></img>
                    </figure>
                    <div className={isDarkMode === false ? 'caption-div-dark' : 'caption-div'}>
                        <h1>History</h1>
                    </div>

                    <div className="button-div">
                        <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={goBack}>Go Back</button>
                        <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={clearHistory}>Clear</button>
                    </div>
                </div>
            </div>
            );
}

export default History;
