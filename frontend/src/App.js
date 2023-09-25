import React, { useEffect, useState } from "react";
import "./App.css";
import Input from "./Component/Input";
import axios from 'axios';
import { v4 as uuid } from "uuid";

function App() {
  const [inputData, setInputData] = useState("");
  const [todos, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(async () => {
      const response = await axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/task-list/',
      })
      .then(() => "Successfully fetched...")
      .catch((err) => `Error while fetching data::ERRROR: ${err}`);

      const data = response.data;
      setLoading(true);
      console.log(data);
      setTodo([...data]);
    }, 250);

    // DEBOUNCING: if the inputData changes earlier than the given timer i.e. '250ms' then the timer is cleared out, and it won't fetch the data...
    return () => clearTimeout(timer);
  }, [inputData]);

  function handleInput(event) {
    const { value } = event.target;
    setInputData(value);
  }

  function addTodo() {
    // setTodo([...todo, inputData]);
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/task-create/',
      data: {
        id: uuid(), // no real use of uuid() here now,
        title: inputData,
        completed: false,
      }
    })
    .then(res => 
      console.log(`Todo successfully added to the server... Response: ${res}`
      ))
    .catch(err => 
      console.log(`Error occurred while adding todo to the server... Error: ${err}`
    ));
    setInputData("");
  }

  function deleteTodo(index) {
    const newTodo = todos.filter((_, i) => i !== index);
    setTodo(newTodo);
  }

  const listEl = todos.map((todo, index) => {
    return (
      <li key={index} className='flex justify-between items-center mb-2'>
        {todo.title}
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