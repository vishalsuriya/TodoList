import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

const EditTask = ({ task, onSave }) => {
  const [description, setDescription] = useState(task.description);
  const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);

  const updateDescription = async () => {
    try {
      const body = { description };
      const response = await fetch(`http://localhost:8000/update/${task.task_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toggleOpen(); 
        window.location.reload();
      } else {
        console.error("Failed to update task, status:", response.status);
      }
    } catch (err) {
      console.error("Error during update:", err);
    }
  };

  return (
    <>
      <MDBBtn onClick={toggleOpen}>EDIT</MDBBtn>
      <MDBModal open={basicModal} onClose={toggleOpen} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Task</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn 
                color='primary'
                onClick={updateDescription}
              >
                Save
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EditTask;
