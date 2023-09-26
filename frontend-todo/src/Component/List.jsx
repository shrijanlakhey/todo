const List = (props) => {
    const {todoData, updateTodo, deleteTodo} = props;
    const {id, title, completed} = todoData;  // destructuring the properties of todo...

  return (
    <>
        <li className='flex justify-between items-center my-4'>
          <div >
            <input 
              type="checkbox" 
              id={`todo-${id}`}
              className="mr-2 " 
              checked={completed}
              onChange={() => updateTodo(id, title, completed)}
            />
            <label 
                htmlFor={`todo-${id}`}  
                className={`cursor-pointer ${completed ? 'italic line-through text-slate-400' : ''}`} 
            >
              {title}
            </label>
          </div>
          <button
            onClick={() => deleteTodo(id)}
            className='bg-red-500 hover:bg-red-700 text-white py-1 px-2.5 mx-1 rounded transition-all'
          >
            X
          </button>
        </li>
        <hr />
    </>
  )
}

export default List