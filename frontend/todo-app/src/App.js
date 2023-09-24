import React from "react";
import "./App.css";

function App() {
  const [inputData, setInputData] = React.useState("");
  const [todo, setTodo] = React.useState([]);

  function handleInput(event) {
    const { name, value } = event.target;
    setInputData(value);
    console.log(value);
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
      <div className='flex'>
        <input
          // name='work'
          value={inputData}
          onChange={handleInput}
          type='text'
          placeholder='Add your work'
          className='border border-gray-400 mr-2 px-4 py-2 flex-grow'
        />
        <button
          onClick={addTodo}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add
        </button>
      </div>
      <ul className='list-inside list-decimal my-4'>{listEl}</ul>
    </div>
  );
}

export default App;
