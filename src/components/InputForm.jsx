import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
function InputForm({addTask,updateTask}){
    const input=useSelector(state=>state.todos.input)
    const id=useSelector(state=>state.id)
    const dispatch=useDispatch()
    const[error,setError]=useState(false)
    const createItem=()=>{
        if(input===''){
            setError(true)
            return
          }
            addTask(input)
            setError(false)
    }
    const handleInput=(e)=>{
        let action={type:'SET_INPUT',payload:e.target.value}
        dispatch(action)
    }
    return(
        <div className="container">
            <h1>To_Do_List</h1>
            <input className="input" value={input} type="text" onChange={handleInput} placeholder={error ? 'Input Is Empty' :'Enter Task'} style={{borderColor:error ? 'red':""}}/>
            {id===0 ?(<button className="addBtn" onClick={createItem}>AddTask</button>):(<button onClick={()=>updateTask(id)}>EditTask</button>)}
        </div>
    )
}
export default InputForm