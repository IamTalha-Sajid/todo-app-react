import React from 'react';
import logo from './todo-list.svg';
import './App.css';

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
          <button className="button" onClick={addList}>Add</button>
          <button className="button" onClick={clearList}>Clear</button>
        </div>
        <div className="list-div">
          <div className="todo-list">
            {
              todoList.map((item) => {
                return (
                  <div className="todo-item">
                    <input type="checkbox" className="checkbox"></input>
                    <p className="todo-text">{item}</p>
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
