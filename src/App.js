import React from 'react';
import logo from './todo-list.svg';
import './App.css';
import { FaTrash } from 'react-icons/fa';

function App() {

  const [todoText, setTodoText] = React.useState("");
  const [todoList, setTodoList] = React.useState([]);

  const addList = () => {
    if (todoText === "") {
      alert("Please enter a todo item");
    }
    else {
      setTodoList([...todoList, todoText]);
      setTodoText("");
    }
  };

  const clearList = () => {
    setTodoList([]);
  };

  const deleteItem = (id) => {
    const updatedList = todoList.filter((item, ind) =>{
      return ind !== id
    })

    setTodoList(updatedList);
  }

  return (
    <div className="main-div">
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
          <button className="button" onClick={addList}>Add Item</button>
          <button className="button" onClick={clearList}>Clear all Items</button>
        </div>
        <div className="list-div">
          <div className="todo-list">
            {
              todoList.map((item, ind) => {
                return (
                  <div className="todo-item" key={ind}>
                    <p className="todo-text">{item}</p>
                    <FaTrash className="icon" onClick={() => deleteItem(ind)} alt="Delete Item"/>
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
