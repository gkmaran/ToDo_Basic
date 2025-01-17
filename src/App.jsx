import './App.css'
import { useSelector,useDispatch } from 'react-redux'
import {useEffect} from 'react'
import InputForm from './components/InputForm'
import TaskItem from './components/renderTask'

function App() {
 
  const {todos,input}=useSelector(state=>state.todos)
  const dispatch=useDispatch()
  const date=new Date();
  const createdAt=date.toISOString()
  const addTask=(input)=>{
    let obj={id:Date.now(),name:input,is_completed:false,created_At:createdAt}
    let action={type:'ADD_TASK',payload:obj}
    dispatch(action)
  }
  const deleteTask=(id)=>{
    let action={type:'DELETE_TASK',payload:id}
    dispatch(action)
  }
  const toggleItem=(id)=>{
    let action={type:'TOGGLE_ITEM',payload:id}
    dispatch(action)
  }
  const editTask=(task)=>{
    dispatch({type:'EDIT_TASK',payload:task})
  }
  const updateTask=(id)=>{
    const date=new Date();
    const editedAt=date.toLocaleString()
    let newObj={id:id,name:input,is_completed:false,editedAt:editedAt}
    dispatch({type:'UPDATE_TASK',payload:newObj})
  }
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  return(
    <>  
      <InputForm addTask={addTask} updateTask={updateTask} />
      <TaskItem todos={todos} deleteTask={deleteTask} toggleItem={toggleItem} editTask={editTask}/>  
    </>
  )
}

export default App
