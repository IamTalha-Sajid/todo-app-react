import React, {useEffect} from 'react';
import logo from './todo-list.svg';
import darkLogo from "./todo-list-dark.svg";
import {DarkModeSwitch} from 'react-toggle-dark-mode';
import {toast, ToastContainer} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import './App.css';


function History() {
    const navigate = useNavigate();

    const [isDarkMode, setDarkMode] = React.useState(false);
    const [userHistory, setUserHistory] = React.useState([]);

    useEffect(() => {

        let currUser = localStorage.getItem('currentUser');

        const existingHistory = JSON.parse(localStorage.getItem('history')) || [];
        const filteredHistory = existingHistory.filter(history => history.userId === currUser);
        setUserHistory(filteredHistory);

        }, []);


    useEffect(() => {
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    const goBack = () => {
        navigate('/Todo')
    }

    const clearHistory = () => {
        let newHistory = JSON.parse(localStorage.getItem('history')) || []
        let arr1 = newHistory.filter(todoLists => todoLists.userId !== localStorage.getItem('currentUser') )
        setUserHistory(arr1);

        localStorage.setItem('history', JSON.stringify(arr1))
        toast.info("Cleared History Successfully")
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
                <div className="history">
                    {
                        userHistory.map(({userId, historyText, i}) => {
                            return (
                                <div className={isDarkMode === false ? 'history-item-dark' : 'todo-item'} key={i}>
                                    <p className={isDarkMode === false ? 'history-text-dark' : 'todo-text'}>{historyText}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="button-div">
                    <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={goBack}>Go Back
                    </button>
                    <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={clearHistory}>Clear
                    </button>
                </div>
            </div>
        </div>
    );
}

export default History;
