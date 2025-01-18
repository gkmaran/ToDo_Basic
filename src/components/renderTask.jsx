import { useState } from 'react'
import './renderTask.css'
function TaskItem({todos,deleteTask,toggleItem,editTask}){
    const[completed,setcompleted]=useState(false)
    const getCompletedTask=()=>{
        return todos.filter(item=>item.is_completed)
    }
    return(
            <div className='render-list'>
                <button onClick={()=>setcompleted(!completed)}>{completed ? "ShowAllTask" : "ShowCompletedTask"}</button>
                {completed ?(
                    <div>
                        <h3>CompletedTask</h3>
                        {getCompletedTask().length > 0 ?
                            (getCompletedTask().map(item=>(
                                <div key={item.id} className='renderlist-child'>
                                <h3>{item.name}</h3>
                                <p>completedAt:{item.completedAt}</p>
                                <button className='delBtn' onClick={()=>deleteTask(item.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                                </div> 
                            ))
                            ):(
                                <p>No CompletedTasks Available</p>
                            )}
                    </div>
                ):(
                <div>
                    <h3>All Tasks</h3>
                    {todos.length>0 ?(
                    todos.map(item=>(
                    <div key={item.id} className='renderlist-child'>
                    <input type="checkbox" checked={item.is_completed} onChange={()=>toggleItem(item.id)}/>
                    <h3 className={item.is_completed ? "line-through" :''}>{item.name}</h3>
                    {item.editedAt ? (<p> editedAt: {item.editedAt}</p>)
                    :(<p>CreatedAt: {item.created_At}</p>)}
                    <button className='delBtn' onClick={()=>deleteTask(item.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    <button className='editBtn' onClick={()=>editTask(item)}><i className="fas fa-edit"></i></button>
                    </div> 
                    ))
                    ):
                    (<p>No Tasks Available</p>)}
                </div>
            )}
            </div>
    )}
export default TaskItem