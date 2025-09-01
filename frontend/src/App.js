import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './pages/TaskList';

function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={token ? <TaskList /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/tasks" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
