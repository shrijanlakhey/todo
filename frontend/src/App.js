import React from "react";
import "./App.css";
import Input from "./Component/Input";

function App() {
  const [inputData, setInputData] = React.useState("");
  const [todo, setTodo] = React.useState([]);

  function handleInput(event) {
    const { value } = event.target;
    setInputData(value);
  }
  function addTodo() {
    setTodo([...todo, inputData]);
    setInputData("");
  }
  function deleteTodo(index) {
    const newTodo = todo.filter((_, i) => i !== index);
    setTodo(newTodo);
  }
  const listEl = todo.map((item, index) => {
    return (
      <li key={index} className='flex justify-between items-center mb-2'>
        {item}
        <button
          onClick={() => deleteTodo(index)}
          className='bg-red-500 hover:bg-red-700 text-white py-1 px-2.5 mx-5 rounded'
        >
          X
        </button>
      </li>
    );
  });

  return (
    <div className='mx-auto max-w-md'>
      <h1 className='text-3xl font-bold mb-4 text-gray-500'>To-do</h1>
      <Input
        inputValue={inputData}
        inputFunc={handleInput}
        addTodoFunc={addTodo}
      />
      <ul className='list-inside list-decimal my-4'>{listEl}</ul>
    </div>
  );
}

export default App;
