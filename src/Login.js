import React, {useEffect, useId} from 'react';
import logo from './todo-list.svg';
import darkLogo from "./todo-list-dark.svg";
import {DarkModeSwitch} from 'react-toggle-dark-mode';
import {toast, ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import './App.css';


function Login() {

    const navigate = useNavigate();

    const [isDarkMode, setDarkMode] = React.useState(false);
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    useEffect(() => {
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    const signUp = () => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (existingUsers.some(user => user.userName === userName)) {
            setUserName("");
            setPassword("");
            toast.error('Username already exists!');
            return;
        }
        const todoList = []
        const userHistory = []
        const newUser = {userName, password, userHistory};
        localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
        setUserName("");
        setPassword("");
        toast.success('Sign up successful!');
    }

    const loginUser = () => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const matchingUser = existingUsers.find(user => user.userName === userName && user.password === password);
        if (matchingUser) {
            toast.success('Login successful!');
            localStorage.setItem('currentUser', userName)
            navigate('/Todo');
        } else {
            setUserName("");
            setPassword("");
            toast.error('Invalid username or password!');
        }
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
                    <h1>Login and Signup</h1>
                </div>
                <div className="input-div">
                    <input className="input-field" type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} value={userName}></input>
                    <input className="input-field" type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                </div>
                <div className="button-div">
                    <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={loginUser}>Login</button>
                    <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={signUp}>Signup</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
