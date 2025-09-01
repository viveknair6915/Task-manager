import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setTasks(data);
      else setError('Failed to fetch tasks');
    } catch {
      setError('Server error');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description })
      });
      const data = await res.json();
      if (res.ok) {
        setTasks([data, ...tasks]);
        setTitle('');
        setDescription('');
      } else setError(data.msg || 'Add failed');
    } catch {
      setError('Server error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setTasks(tasks.filter(t => t._id !== id));
      else setError('Delete failed');
    } catch {
      setError('Server error');
    }
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/tasks/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: editTitle, description: editDescription })
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(tasks.map(t => t._id === editId ? data : t));
        setEditId(null);
      } else setError(data.msg || 'Edit failed');
    } catch {
      setError('Server error');
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setTasks(tasks.map(t => t._id === id ? data : t));
      else setError('Toggle failed');
    } catch {
      setError('Server error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="tasklist-container">
      <h2>Task Manager</h2>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleAdd} className="add-form">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className={task.status === 'completed' ? 'completed' : ''}>
            {editId === task._id ? (
              <form onSubmit={handleEditSubmit} className="edit-form">
                <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} required />
                <input type="text" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <span onClick={() => handleToggle(task._id)} style={{ cursor: 'pointer' }}>
                  [{task.status === 'completed' ? '✔' : '○'}] <b>{task.title}</b> - {task.description}
                </span>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
