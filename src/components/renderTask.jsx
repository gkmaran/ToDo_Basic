import { useState } from 'react'
import './renderTask.css'
function TaskItem({todos,deleteTask,toggleItem,editTask}){
    return(
            <div className='render-list'>
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
                ))):
                (<p>No Tasks Available</p>)}
            </div>
        )}
export default TaskItem