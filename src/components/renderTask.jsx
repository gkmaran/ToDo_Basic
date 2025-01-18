import { useState } from 'react';
import './renderTask.css';

function TaskItem({ todos, deleteTask, toggleItem, editTask }) {
  const [currentView, setCurrentView] = useState('all'); // 'all', 'pending', 'completed'

  const getCompletedTasks = () => todos.filter((item) => item.is_completed);

  const getPendingTasks = () => {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const now = new Date();
    return todos.filter(
      (task) =>
        !task.is_completed && now - new Date(task.createdAt) > oneDayInMs
    );
  };

  const completedTasks = getCompletedTasks();
  const pendingTasks = getPendingTasks();

  return (
    <div className="render-list">
      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button onClick={() => setCurrentView('all')}>All Tasks</button>
        <button onClick={() => setCurrentView('pending')}>Pending Tasks</button>
        <button onClick={() => setCurrentView('completed')}>Completed Tasks</button>
      </div>

      {/* Render based on the current view */}
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
                  <p>Edited At: {item.editedAt}</p>
                ) : (
                  <p>Created At: {item.created_At}</p>
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
                <p>Created At: {item.created_At}</p>
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
                <p>Completed At: {item.completedAt}</p>
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
