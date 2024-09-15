import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import EditTask from "./EditTask";
const ListTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTask = async () => {
    try {
      const response = await fetch("http://localhost:8000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/delete/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setTasks(tasks.filter(task=>task.task_id !== id));
        console.log(`Task with id ${id} deleted`);
      } else {
        console.log("Failed to delete task, status:", response.status);
      }
    } catch (err) {
      console.log("Error during delete:", err);
    }
  };
  return (
    <MDBTable align="middle" className="mt-5">
      <MDBTableHead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {tasks.map((task) => (
          <tr key={task.task_id}>
            <td>{task.description}</td>
            <td>
              <EditTask task = {task}/>
            </td>
            <td>
              <button 
                className="btn btn-danger"
                onClick={() => handleDelete(task.task_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default ListTasks;
