import React, { useState } from "react";

const InputTask = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
        if (!description.trim()) {
            alert("Please enter a task");
            return; 
          }
      const body = { description };
      const response = await fetch("https://todolist-hb88.onrender.com/newtask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setDescription("");
        window.location.reload();
      } else {
        console.error("Failed to submit the task");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Todo-List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your task"
        />
        <button type="submit" className="btn btn-success "style={{ marginLeft: '5px' }}>
          Add
        </button>
      </form>
    </>
  );
};

export default InputTask;
