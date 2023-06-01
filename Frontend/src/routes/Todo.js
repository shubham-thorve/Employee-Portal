import { useNavigate } from "react-router-dom";
import React from "react";
import TodoList from "../components/todo/TodoList"


const Todo = () => {
  // const auth = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear()
    navigate("/");
  };
  return (
    <>
      
      <div>
        {/* Todo Page {auth.user} */}
       <TodoList/>
      </div>
    </>
  );
};

export default Todo;
