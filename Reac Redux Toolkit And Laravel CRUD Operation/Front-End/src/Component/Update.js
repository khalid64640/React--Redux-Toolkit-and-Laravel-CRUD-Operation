import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { updateformData, fetchUser } from "../redux/Slices/fetchSlice";

function Update({ customStyles, closeUpdateModal, isModalOpen, user }) {
  const dispatch = useDispatch();
  const [formUpdate, setFormUpdate] = useState(user || {});

useEffect(() => {
  
  setFormUpdate(user || {});
}, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (user) {
     
      dispatch(updateformData({ id: user.id, formData: formUpdate }))
        .then(() => {
           dispatch(fetchUser());
          Swal.fire("Updated!", "User data has been updated.", "success").then(
            () => {
              closeUpdateModal();
            }
          );
        })
        .catch((error) => {
          Swal.fire(
            "Error",
            "An error occurred while updating the user.",
            "error"
          );
          console.error("Error updating user:", error);
        });
    } else {
      console.error("No user selected for update.");
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeUpdateModal}
      contentLabel="Update User"
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="modal-header justify-content-between">
        <h2>Update User</h2>
        <button
          className="modal-close-btn btn btn-danger"
          onClick={closeUpdateModal}
        >
          &times;
        </button>
      </div>
      <div className="modal-body">
        <form>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formUpdate.name || ""}
            onChange={(e) =>
              setFormUpdate({ ...formUpdate, name: e.target.value })
            }
          />

          <label htmlFor="fname">F/Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            className="form-control"
            value={formUpdate.fname || ""}
            onChange={(e) =>
              setFormUpdate({ ...formUpdate, fname: e.target.value })
            }
          />

          <label htmlFor="province">Province</label>
          <input
            type="text"
            id="province"
            name="province"
            className="form-control"
            value={formUpdate.province || ""}
            onChange={(e) =>
              setFormUpdate({ ...formUpdate, province: e.target.value })
            }
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            id="phone"
            name="phone"
            className="form-control"
            value={formUpdate.phone || ""}
            onChange={(e) =>
              setFormUpdate({ ...formUpdate, phone: e.target.value })
            }
          />

          <button
            className="btn btn-primary mt-4"
            onClick={handleUpdate}
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default Update;
