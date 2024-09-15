import React from "react";
import InputTask from "./components/InputTask";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListTasks from "./components/ListTasks";
function App() {
  return (
   <>
   <div className="container">
    <InputTask />
    <ListTasks />
   </div>
   </>
  );
}

export default App;
