import React, {useCallback, useState} from 'react';
import "./App.css";
import Lists from "./components/lists";
import Form from "./components/form"

export default function App() {
  console.log('App Component')
  const [todoData, setTodoData] = useState([])
  const [value, setValue] = useState("");

  

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData(prev => [...prev, newTodo])
    setValue("")
  } 

  const handleClick = useCallback((id) => {
    let newTodoData = todoData.filter(x => x.id !== id);
    console.log(newTodoData);
    setTodoData(newTodoData)
}, [todoData]);


  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow-sm lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
        </div>
        
        <Lists todoData={todoData} setTodoData={setTodoData} handleClick={handleClick}/>
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>
        
      </div>
    </div>
  )

}