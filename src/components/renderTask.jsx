import { useState } from 'react';
import './renderTask.css';

function TaskItem({ todos, deleteTask, toggleItem, editTask }) {
  const [currentView, setCurrentView] = useState('all');

  // Function to format date and time
  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return `${formattedDate} at ${formattedTime}`;
  };

  // Function to get tasks pending for more than 24 hours
  const getPendingTasks = () => {
    const oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const now = Date.now();

    return todos.filter((task) => {
      const createdAtTime = Date.parse(task.created_At); // Ensure valid date parsing
      if (isNaN(createdAtTime)) return false;
      return !task.is_completed && now - createdAtTime > oneDayInMs;
    });
  };

  const getCompletedTasks = () => todos.filter((item) => item.is_completed);

  const completedTasks = getCompletedTasks();
  const pendingTasks = getPendingTasks();

  return (
    <div className="render-list">
      <div className="navigation-buttons">
        <button onClick={() => setCurrentView('all')}>All Tasks</button>
        <button onClick={() => setCurrentView('pending')}>Pending Tasks</button>
        <button onClick={() => setCurrentView('completed')}>Completed Tasks</button>
      </div>

      {currentView === 'all' && (
        <div>
          <h3>All Tasks</h3>
          {todos.length > 0 ? (
            todos.map((item) => (
              <div key={item.id} className="renderlist-child">
                <input
                  type="checkbox"
                  checked={item.is_completed}
                  onChange={() => toggleItem(item.id)}
                />
                <h3 className={item.is_completed ? 'line-through' : ''}>
                  {item.name}
                </h3>
                {item.editedAt ? (
                  <p>Edited At: {formatDateAndTime(item.editedAt)}</p>
                ) : (
                  <p>Created At: {formatDateAndTime(item.created_At)}</p>
                )}
                <button className="delBtn" onClick={() => deleteTask(item.id)}>
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button className="editBtn" onClick={() => editTask(item)}>
                  <i className="fas fa-edit"></i>
                </button>
              </div>
            ))
          ) : (
            <p>No Tasks Available</p>
          )}
        </div>
      )}

      {currentView === 'pending' && (
        <div>
          <h3>Pending Tasks</h3>
          {pendingTasks.length > 0 ? (
            pendingTasks.map((item) => (
              <div key={item.id} className="renderlist-child">
                <h3>{item.name}</h3>
                <p>Pending Since: {formatDateAndTime(item.created_At)}</p>
                <button className="delBtn" onClick={() => deleteTask(item.id)}>
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            ))
          ) : (
            <p>No Pending Tasks Available</p>
          )}
        </div>
      )}

      {currentView === 'completed' && (
        <div>
          <h3>Completed Tasks</h3>
          {completedTasks.length > 0 ? (
            completedTasks.map((item) => (
              <div key={item.id} className="renderlist-child">
                <h3>{item.name}</h3>
                <p>Completed At: {formatDateAndTime(item.completedAt)}</p>
                <button className="delBtn" onClick={() => deleteTask(item.id)}>
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            ))
          ) : (
            <p>No Completed Tasks Available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskItem;

