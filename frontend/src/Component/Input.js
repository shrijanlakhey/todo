import React from "react";

export default function Input(props) {
  const {inputValue, inputFunc, addTodoFunc } = props;  // destructuring the props...

  return (
    <div className='flex'>
      <input
        // name='work'
        value={inputValue}
        onChange={inputFunc}
        type='text'
        placeholder='Add your work'
        className='border border-gray-400 mr-2 px-4 py-2 flex-grow'
      />
      <button
        onClick={addTodoFunc}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Add
      </button>
    </div>
  );
}
