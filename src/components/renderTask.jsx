import { useState } from 'react'
import './renderTask.css'
import { parse, format, isBefore } from 'date-fns';
function TaskItem({todos,deleteTask,toggleItem,editTask}){
    const[showPending,setShowPending]=useState(false)

    const handleShowPending=()=>{
        setShowPending(!showPending)
    }
    const getPendingTasks = () => {
        const today = new Date(); // Current date
        return todos.filter(item => {
            try {
                // Parse the creation date
                const taskDate = new Date(item.created_At);
    
                // Normalize both dates to ensure time zones don't interfere
                const normalizedTaskDate = new Date(taskDate.setHours(0, 0, 0, 0));
                const normalizedToday = new Date(today.setHours(0, 0, 0, 0));
    
                // Check if the task is pending
                return !item.is_completed && normalizedTaskDate < normalizedToday;
            } catch (error) {
                console.error('Error parsing date:', item.created_At, error);
                return false;
            }
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
                                <h3>{item.name}</h3>
                                <p>Created At: {item.created_At}</p>
                                <p>Pending Since: {item.created_At}</p>
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
                <h3 className={item.is_completed ? "line-through" :''}>{item.name}</h3>
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