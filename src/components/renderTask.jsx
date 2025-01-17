import { useState } from 'react'
import './renderTask.css'
import {isBefore, parseISO,startOfDay} from 'date-fns';
function TaskItem({todos,deleteTask,toggleItem,editTask}){
    const[showPending,setShowPending]=useState(false)

    const handleShowPending=()=>{
        setShowPending(!showPending)
    }
    const getPendingTasks = () => {
    const today = startOfDay(new Date());
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()); 
    return todos.filter(item => {
        const taskDate = parseISO(item.created_At); 
        const normalizedTaskDate = new Date(
            taskDate.getFullYear(),
            taskDate.getMonth(),
            taskDate.getDate() 
        );
        return !item.is_completed && isBefore(normalizedTaskDate, todayDate);
    });
};
    return(
        <div className='render-list'>
             <button onClick={handleShowPending}>
                {showPending ? "All Tasks": "Pending Tasks"}
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
                        <p>No Pending Tasks Available</p>
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
                <button className='delBtn' onClick={()=>deleteTask(item.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                <button className='editBtn' onClick={()=>editTask(item)}><i className="fas fa-edit"></i></button>
                </div> 
                ))):
                (<p>No Tasks Available</p>)}
            </div>
        )}
         </div>
    )
}
export default TaskItem