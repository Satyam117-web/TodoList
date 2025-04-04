import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [ showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos);
    }
  }, [])


  const saveTols = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handelEdit = (e, id) => {
    let t = todos.filter(i => i.id == id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveTols()
  }
  const toggleFinished= (e) => {
    setshowFinished(!showFinished)
  }
  

  const handelDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveTols()
  }
  const handelAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }
  const handelChange = (e) => {
    setTodo(e.target.value)
  }
  const handelCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTols()
  }


  return (
    <>
      <Navbar />
      <div className="md:container md:w-[60vw]  md:mx-auto my-5 rounded-xl p-5 bg-stone-300 min-h-[90vh]" >
        <div className="addtodo my-5 flex flex-col gap-4 ">
          <h2 className='text-xl font-bold'>Add a todo</h2>
          <input onChange={handelChange} value={todo} type="text" className='w-full mx-auto rounded-full p-1 font-mono  ' />
          <button onClick={handelAdd} disabled={todo.length<3} className='  bg-slate-700 hover:bg-slate-900 font-bold text-sm   p-2 py-1 rounded-md text-white mx-6 '>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished}  /> Show finished
        <h2 className='text-xl font-bold'>Your todo</h2>
        <div className="todos">
          {todos.length == 0 && <div>No todo to display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) &&<div key={item.id} className="todo flex justify-between  md:w-1/2   m-2 ">
              <input name={item.id} onChange={handelCheckbox} type="checkbox"  checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo} </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handelEdit(e, item.id)} className='bg-slate-700 hover:bg-slate-900 font-bold text-sm p-2 py-1 rounded-md text-white mx-1'>Edit</button>
                <button onClick={(e) => handelDelete(e, item.id)} className='bg-slate-700 hover:bg-slate-900 font-bold text-sm p-2 py-1 px-4 rounded-md text-white mx-1'><MdDelete /> </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
