import React, { useEffect, useId} from 'react';
import logo from './todo-list.svg';
import darkLogo from "./todo-list-dark.svg";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

function Todo() {

    const navigate = useNavigate();

    const [todoText, setTodoText] = React.useState("");
    const [id, setId] = React.useState("");
    const [todoList, setTodoList] = React.useState([]);
    const [updateStatus, setUpdateStatus] = React.useState(false);
    const [itemId, setItemId] = React.useState(0)
    const [isDarkMode, setDarkMode] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState("");


    useEffect(() => {
        let currUser = localStorage.getItem('currentUser')
        setCurrentUser(currUser);

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = existingUsers.findIndex(user => user.userName === currentUser);
        setTodoList(existingUsers[userIndex].todoList)

        const existingTodoLists = JSON.parse(localStorage.getItem('todoLists')) || [];
        setTodoList(existingTodoLists.filter(user => user.userName === currentUser.userName))
        console.log("todo List of current user", todoList)
        }, [todoText, isDarkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    const checkHistory = () => {
        navigate('/History')
    }

    let randomId = useId();

    const addList = () => {
        if (todoText === "") {
            toast.error("Input field cannot be empty")
        }
    else {
        setTodoList([...todoList, {userId: currentUser.userName, todoId: randomId, item:todoText}])
        let newTodoLists = JSON.parse(localStorage.getItem('todoLists')) || []
        let arr = newTodoLists.filter(user => user.userName !== currentUser.userName);
        console.log("Todo List in state", todoList)
        arr = [...arr, ...todoList]
        console.log("New List", arr)
        localStorage.setItem('todoLists', JSON.stringify(newTodoLists))
        setTodoText("");
        toast.success("Added to list successfully")
        }
    };

    const clearList = () => {
        if (todoList.length === 0) {
            toast.error("No item to clear")
        }
    else {
        setTodoList([]);
        setItemId(0)
            toast.info("Cleared list successfully")
    }
    };

    const deleteItem = (id) => {
        const updatedList = todoList.filter(todoList => todoList.id !== id)
        console.log(updatedList);
        setTodoList(updatedList);
        toast.info("Deleted item successfully")
    }

    const editMode = (id) => {
        const editedItem = todoList.find(todoList => todoList.id === id)
        setTodoText(editedItem.item);
        setUpdateStatus(true)
        setId(id)
    }

    const updateItem = () => {

        let newArr = [...todoList];
        let index = newArr.findIndex((x) => x.id === id);
        console.log("todo text before loop index", index)
        newArr[index].item = todoText;
        setTodoList(newArr);
        console.log("new array", todoList)
        setTodoText("");
        setUpdateStatus(false)
        toast.success("Item updated successfully")
    }

    const logout = () => {
        localStorage.setItem('currentUser', "")
        navigate('/')
    }

    return (
            <div className={isDarkMode === true ? 'main-div' : 'main-div-dark'}>
                <div className="dark-mode">
                    <h2 className={isDarkMode === false ? 'caption-div-dark' : 'caption-div'}>Welcome {currentUser}</h2>
                    <DarkModeSwitch style={{ marginBottom: '2rem', alignItems: 'right' , padding: '10px', margin: '20px'}} checked={isDarkMode} onChange={toggleDarkMode} size={40} sunColor ='#fff' moonColor='#2d5354'/>
                    <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={logout}>Logout</button>
                </div>
                <ToastContainer />
                <div className="center-div">
                    <figure>
                        <img className="logo" src={isDarkMode === true ? logo : darkLogo} alt="Todo List"></img>
                    </figure>
                    <div className={isDarkMode === false ? 'caption-div-dark' : 'caption-div'}>
                        <h1>Todo List Application</h1>
                    </div>
                    <div className="input-div">
                        <input className="input-field" type="text" placeholder="Add an item..." value={todoText} onChange={(e) => setTodoText(e.target.value)}></input>
                    </div>
                    <div className="button-div">
                        <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={updateStatus === true ? () => updateItem() : () => addList()}>{updateStatus === true ? "Update Item" : "Add Item"}</button>
                        <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={clearList}>Clear all Items</button>
                    </div>
                    <div className="list-div">
                        <div className="todo-list">
                            {
                                todoList.map(({ id, item }) => {
                                return (
                                    <div className={isDarkMode === false ? 'todo-item-dark' : 'todo-item'} key={id}>
                                        <p className={isDarkMode === false ? 'todo-text-dark' : 'todo-text'}>{item}</p>
                                        <div>
                                            <FaPencilAlt className="update-icon" onClick={() => editMode(id)} alt="Update Item" />
                                            <FaTrash className="delete-icon" onClick={() => deleteItem(id)} alt="Delete Item" />
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="button-div">
                        <button className={isDarkMode === false ? 'button-dark' : 'button'} onClick={checkHistory}>History</button>
                    </div>
                </div>
            </div>
            );
}

export default Todo;
