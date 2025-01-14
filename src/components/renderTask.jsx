import { useState } from 'react'
import './renderTask.css'
function TaskItem({todos,deleteTask,toggleItem,editTask}){
    const[showPending,setShowPending]=useState(false)

    const handleShowPending=()=>{
        setShowPending(!showPending)
    }
    const getPendingTasks = () => {
        const today = new Date().toISOString().split('T')[0];
        return todos.filter(item => {
            const taskDate = new Date(item.created_At).toISOString().split('T')[0];
            return !item.is_completed && new Date(taskDate) < new Date(today);
        });
    }; 
    return(
        <div className='render-list'>
             <button onClick={handleShowPending}>
                {showPending ? "Hide Pending Tasks" : "Show Pending Tasks"}
            </button>

            {/* Render Pending Tasks */}
            {showPending && (
                <div>
                    <h3>Pending Tasks</h3>
                    {getPendingTasks().length > 0 ? (
                        getPendingTasks().map(item => (
                            <div key={item.id} className="renderlist-child">
                                <h2>{item.name}</h2>
                                <p>Created At: {item.created_At}</p>
                                <p>Pending Since: {item.created_At}</p>
                                <button onClick={() => deleteTask(item.id)}>Delete</button>
                                <button onClick={() => editTask(item)}>Edit</button>
                            </div>
                        ))
                    ) : (
                        <p>No Pending Tasks</p>
                    )}
                </div>
            )}

            {!showPending && (
            <div>
                <h3>All Tasks</h3>
                {todos.length>0 ?(
                todos.map(item=>(
                <div key={item.id} className='renderlist-child'>
                <input type="checkbox" checked={item.is_completed} onChange={()=>toggleItem(item.id)}/>
                <h2 className={item.is_completed ? "line-through" :''}>{item.name}</h2>
                {item.editedAt ? (<p> editedAt: {item.editedAt}</p>)
                :(<p>CreatedAt: {item.created_At}</p>)}
                <button className='delBtn' onClick={()=>deleteTask(item.id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button className='editBtn' onClick={()=>editTask(item)}><i class="fas fa-edit"></i></button>
                </div> 
                ))):
                (<p>No Tasks Available</p>)}
            </div>
        )}
         </div>
    )
}
export default TaskItem