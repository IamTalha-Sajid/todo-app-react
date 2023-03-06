import React, {useEffect} from 'react';
import logo from './todo-list.svg';
import darkLogo from "./todo-list-dark.svg";
import {DarkModeSwitch} from 'react-toggle-dark-mode';
import {toast, ToastContainer} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import {FaTrash, FaPencilAlt} from 'react-icons/fa';
import { v1 as uuidv1 } from 'uuid';

function Todo() {

    const navigate = useNavigate();

    const [todoText, setTodoText] = React.useState("");
    const [id, setId] = React.useState("");
    const [todoList, setTodoList] = React.useState([]);
    const [updateStatus, setUpdateStatus] = React.useState(false);
    const [isDarkMode, setDarkMode] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState("");
    const [history, setHistory] = React.useState([]);


    useEffect(() => {
        let currUser = localStorage.getItem('currentUser')
        setCurrentUser(currUser);

        const existingTodoLists = JSON.parse(localStorage.getItem('todoLists')) || [];
        setTodoList(existingTodoLists.filter(todoLists => todoLists.userId === currUser))

        const existingHistory = JSON.parse(localStorage.getItem('history')) || [];
        setHistory(existingHistory.filter(history => history.userId === currUser))

    }, []);

    useEffect(() => {
        if(localStorage.getItem('currentUser') === ""){
            navigate('/')
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    const checkHistory = () => {
        navigate('/History')
    }

    const addList = () => {
        if (todoText === "") {
            toast.error("Input field cannot be empty")
        } else {
            let id = uuidv1();
            setTodoList([...todoList, {userId: currentUser, todoId: id, item: todoText}])

            let newTodoLists = JSON.parse(localStorage.getItem('todoLists')) || []
            let arr = newTodoLists.filter(todoLists => todoLists.userId !== currentUser);

            arr = [...arr, ...todoList, {userId: currentUser, todoId: id, item: todoText}]

            let newHistory = JSON.parse(localStorage.getItem('history')) || []
            let arr1 = newHistory.filter(todoLists => todoLists.userId !== currentUser);

            arr1 = [...arr1, ...history, {userId: localStorage.getItem('currentUser') , historyText: `Added new item ${todoText} to the list`}]
            setHistory(arr1);

            localStorage.setItem('history', JSON.stringify(arr1))
            localStorage.setItem('todoLists', JSON.stringify(arr))
            setTodoText("");
            toast.success("Added to list successfully")
        }
    };

    const clearList = () => {
        if (todoList.length === 0) {
            toast.error("No item to clear")
        } else {
            setTodoList([]);
            let newTodoLists = JSON.parse(localStorage.getItem('todoLists')) || []
            let arr = newTodoLists.filter(todoLists => todoLists.userId !== currentUser);

            let newHistory = JSON.parse(localStorage.getItem('history')) || []
            let arr1 = newHistory.filter(todoLists => todoLists.userId !== currentUser);

            arr1 = [...arr1, ...history, {userId: localStorage.getItem('currentUser') , historyText: `Cleared all items from list`}]
            setHistory(arr1);

            localStorage.setItem('history', JSON.stringify(arr1))
            localStorage.setItem('todoLists', JSON.stringify(arr))
            setTodoText("");
            toast.info("Cleared list successfully")
        }
    };

    const deleteItem = (id) => {

        let tempArray = todoList.filter(todoLists => todoLists.todoId !== id)
        console.log("tempArray: ", tempArray);
        setTodoList(tempArray);

        let newTodoLists = JSON.parse(localStorage.getItem('todoLists')) || []
        let arr = newTodoLists.filter(todoLists => todoLists.userId !== currentUser);

        arr = [...arr, ...todoList.filter(todoLists => todoLists.todoId !== id)]

        let newHistory = JSON.parse(localStorage.getItem('history')) || []
        let arr1 = newHistory.filter(todoLists => todoLists.userId !== currentUser);

        arr1 = [...arr1, ...history, {userId: localStorage.getItem('currentUser') , historyText: "Delete an item from list"}]
        setHistory(arr1);

        localStorage.setItem('history', JSON.stringify(arr1))

        localStorage.setItem('todoLists', JSON.stringify(arr))

        toast.info("Deleted item successfully")
    }

    const editMode = (id) => {
        console.log("TodoList: ", todoList)
        const [editedItem] = todoList.filter(todoList => todoList.todoId === id)
        console.log("editedItem: ", editedItem.item)
        setTodoText(editedItem.item);
        setUpdateStatus(true)
        setId(id)
    }

    const updateItem = () => {

        if (todoText === "") {
            toast.error("Input field cannot be empty")
        } else {
            const updatedList = todoList.map((item) => {
                if (item.todoId === id) {
                    return { ...item, item: todoText };
                } else {
                    return item;
                }
            });
            setTodoList(updatedList);

            let newTodoLists = JSON.parse(localStorage.getItem('todoLists')) || [];
            let arr = newTodoLists.filter(todoLists => todoLists.userId !== currentUser);
            arr = [...arr, ...updatedList];
            localStorage.setItem('todoLists', JSON.stringify(arr));

            let newHistory = JSON.parse(localStorage.getItem('history')) || [];
            let arr1 = newHistory.filter(todoLists => todoLists.userId !== currentUser);
            arr1 = [...arr1, ...history, {userId: localStorage.getItem('currentUser'), historyText: `Updated item ${todoText}`}];
            setHistory(arr1);
            localStorage.setItem('history', JSON.stringify(arr1));

            setId("");
            setTodoText("");
            setUpdateStatus(false);
            toast.success("Updated item successfully");
        }
    };


    const logout = () => {
        localStorage.setItem('currentUser', "")
        navigate('/')
    }

    return (
        <div className={isDarkMode === true ? 'main-div' : 'main-div-dark'}>
            <div className="dark-mode">
                <h2 className={isDarkMode === false ? 'caption-div-dark' : 'caption-div'}>Welcome {currentUser}</h2>
                <DarkModeSwitch style={{marginBottom: '2rem', alignItems: 'right', padding: '10px', margin: '20px'}}
                                checked={isDarkMode} onChange={toggleDarkMode} size={40} sunColor='#fff'
                                moonColor='#2d5354'/>
                <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={logout}>Logout</button>
            </div>
            <ToastContainer/>
            <div className="center-div">
                <figure>
                    <img className="logo" src={isDarkMode === true ? logo : darkLogo} alt="Todo List"></img>
                </figure>
                <div className={isDarkMode === false ? 'caption-div-dark' : 'caption-div'}>
                    <h1>Todo List Application</h1>
                </div>
                <div className="input-div">
                    <input className="input-field" type="text" placeholder="Add an item..." value={todoText}
                           onChange={(e) => setTodoText(e.target.value)}></input>
                </div>
                <div className="button-div">
                    <button className={isDarkMode === false ? 'button-dark' : 'button'}
                            onClick={updateStatus === true ? () => updateItem() : () => addList()}>{updateStatus === true ? "Update Item" : "Add Item"}</button>
                    <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={clearList}>Clear all
                        Items
                    </button>
                </div>
                <div className="list-div">
                    <div className="todo-list">
                        {
                            todoList.map(({todoId, item}) => {
                                return (
                                        <div className={isDarkMode === false ? 'todo-item-dark' : 'todo-item'} key={todoId}>
                                        <p className={isDarkMode === false ? 'todo-text-dark' : 'todo-text'}>{item}</p>
                                        <div>
                                            <FaPencilAlt className="update-icon" onClick={() => editMode(todoId)}
                                                         alt="Update Item"/>
                                            <FaTrash className="delete-icon" onClick={() => deleteItem(todoId)}
                                                     alt="Delete Item"/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="button-div">
                    <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={checkHistory}>History
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Todo;
