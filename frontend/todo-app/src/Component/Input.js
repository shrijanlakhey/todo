import React from "react";

export default function Input(props) {
  return (
    <div className='flex'>
      <input
        // name='work'
        value={props.inputValue}
        onChange={props.inputFunc}
        type='text'
        placeholder='Add your work'
        className='border border-gray-400 mr-2 px-4 py-2 flex-grow'
      />
      <button
        onClick={props.addTodoFunc}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Add
      </button>
    </div>
  );
}
