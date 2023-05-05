import React from 'react';
import './index.css';
import Home from './routes/Home';
import {Route, Routes} from 'react-router-dom';
import Resume from './routes/Resume';
import Todo from './routes/Todo';
import Login from './routes/Login';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/resume" element={<Resume/>}/>
      <Route path="/todo" element={<Todo/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </>
  );
}

export default App;
