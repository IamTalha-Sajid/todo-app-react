import React, { useEffect } from 'react';
import logo from './todo-list.svg';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './AppDark.css';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';


function App() {

  const [todoText, setTodoText] = React.useState("");
  const [id, setId] = React.useState("");
  const [todoList, setTodoList] = React.useState([]);
  const [updateStatus, setUpdateStatus] = React.useState(false);
  const [itemId, setItemId] = React.useState(0)
  const [isDarkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
  }, [todoText, isDarkMode]);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
  };

  const addList = () => {
    if (todoText === "") {
      toast.error("Input field cannot be empty")
    }
    else {
      setTodoList([...todoList, { id: itemId, item: todoText }]);
      setItemId(itemId + 1);
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

  return (
    <div className="main-div">
      <div className="dark-mode">
        <DarkModeSwitch style={{ marginBottom: '2rem', alignItems: 'right' , padding: '10px'}} checked={isDarkMode} onChange={toggleDarkMode} size={40}/>
      </div>
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
              todoList.map(({ id, item }) => {
                return (
                  <div className="todo-item" key={id}>
                    <p className="todo-text">{item}</p>
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
      </div>
    </div>
  );
}

export default App;
