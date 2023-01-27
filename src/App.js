import React, { useEffect } from 'react';
import logo from './todo-list.svg';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

// toast.configure()

function App() {

  const [todoText, setTodoText] = React.useState("");
  const [todoList, setTodoList] = React.useState([]);
  const [updateStatus, setUpdateStatus] = React.useState(false);
  console.log(todoText);

  useEffect(() => {
  }, [todoText]);

  const addList = () => {
    if (todoText === "") {
      toast.error("Input field cannot be empty")
    }
    else {
      setTodoList([...todoList, todoText]);
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
      toast.info("Cleared list successfully")
    }
  };

  const deleteItem = (id) => {
    const updatedList = todoList.filter((item, ind) => {
      return ind !== id
    })

    setTodoList(updatedList);
    toast.info("Deleted item successfully")
  }

  const editMode = (id) => {
    setTodoText(todoList[id]);
    setUpdateStatus(true)
  }

  const updateItem = () => {

    let newArr = [...todoList];
    let index;
    console.log("todo text before loop", todoText)
    for(let i=0; i< newArr.length ; i++){
      if(todoText === newArr[i]){
        index = i;
      }
    }

    console.log(index);
    newArr[index] = todoText;
    setTodoList(newArr);
    console.log("new array", todoList)
    setTodoText("");
    setUpdateStatus(false)
    toast.success("Item updated successfully")
  }

  return (
    <div className="main-div">
      <ToastContainer />
      <div className="center-div">
        <figure>
          <img className="logo" src={logo} alt="Todo List"></img>
        </figure>
        <div className="caption-div">
          <h1>Todo List Application</h1>
        </div>
        <div className="input-div">
          <input className="input-field" type="text" placeholder="Add an item..." value={todoText} onChange={(e) => setTodoText(e.target.value)}></input>
        </div>
        <div className="button-div">
          <button className="button" onClick={updateStatus === true ? () => updateItem() : () => addList()}>{updateStatus === true ? "Update Item" : "Add Item"}</button>
          <button className="button" onClick={clearList}>Clear all Items</button>
        </div>
        <div className="list-div">
          <div className="todo-list">
            {
              todoList.map((item, ind) => {
                return (
                  <div className="todo-item" key={ind}>
                    <p className="todo-text">{item}</p>
                    <div>
                      <FaPencilAlt className="update-icon" onClick={() => editMode(ind)} alt="Update Item" />
                      <FaTrash className="delete-icon" onClick={() => deleteItem(ind)} alt="Delete Item" />
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
