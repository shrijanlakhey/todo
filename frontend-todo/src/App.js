import React, { useEffect, useState } from "react";
import "./App.css";
import Input from "./Component/Input";
import axios from 'axios';
import { v4 as uuid } from "uuid";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import List from "./Component/List";

function App() {
  const [inputData, setInputData] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Async function to get the response from API and set the todos state...
  async function getApi(url) {
    try {
      const response = await axios({
        method: 'get',
        url,
      })

      const data = await response.data;
      setLoading(true);
      console.log(data);
      setTodos([...data]);
    } catch (err) {
      setLoading(false);
      console.error(`Error while fetching data: ${err}`);
    }
  }
  
  useEffect(() => {
    setLoading(true);
    const current_url = 'http://127.0.0.1:8000/api/task-list/';
    const timer = setTimeout(() => 
      getApi(current_url)
    , 250);

    // DEBOUNCING: if the inputData changes earlier than the given timer i.e. '250ms' then the timer is cleared out, and it won't fetch the data...
    return () => clearTimeout(timer);
  }, [inputData]);

  function handleInput(event) {
    const { value } = event.target;
    setInputData(value);
  }

  function addTodo() {
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

  async function updateTodo(id, title, completed) {
    axios({
      method: 'patch',
      url: `http://127.0.0.1:8000/api/task-update/${id}`,
      data: {
        id,
        title,
        completed: !completed,
      }
    })
    .then(() => { // after the patch request is fulfilled call the getApi and set the todos state...
      const current_url = 'http://127.0.0.1:8000/api/task-list/';
      getApi(current_url);
    })
    .catch(err => console.log("Error in modification..."));
  }

  function deleteTodo(index) {
    const newTodo = todos.filter((_, i) => i !== index);
    setTodos(newTodo);
  }

  const listEl = todos.map((todo, index) => {
    return (
      <>
        <List 
          key = {todo.id}
          todoData = {todo}
          updateTodo = {updateTodo}
          deleteTodo = {deleteTodo}
        />
      </>
    );
  });

  return (
    <div className='mx-auto min-w-[200px] max-w-md md:min-w-[444px] p-2 rounded'>
      <h1 className='text-3xl font-bold mb-4 text-white text-center bg-[#0ea5e9] py-2 rounded cool-shadow'>To-do</h1>
      <Input
        inputValue={inputData}
        inputFunc={handleInput}
        addTodoFunc={addTodo}
      />
      {todos.length !== 0 && <div className="bg-white py-1 max-h-[200px] overflow-y-auto mt-5 no-scrollbar rounded">
        <SimpleBar className="max-h-[200px] mr-1">
          <ul className='list-inside list-decimal my-4 px-4'>
            {listEl}
          </ul>
        </SimpleBar>
      </div>
      }
    </div>
  );
}

export default App;