import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchSlice from "../redux/Slices/fetchSlice";
import {
  fetchUser,
  formDataStore,
  DeleteUser,
  updateUser,
} from "../redux/Slices/fetchSlice";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import Update from "./Update";

function Table() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    fname: "",
    province: "",
    phone: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(updateUser(selectedUser.id)); // Fetch user details
    }
  }, [selectedUser, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

 const handleEdit = (id) => {
   const userToEdit = users.find((user) => user.id === id);
   if (userToEdit) {
     setSelectedUser(userToEdit); 
     setIsModalOpen(true);
   } else {
     console.error(`User with id ${id} not found.`);
   }
 };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteUser(id))
          .then(() => {
            dispatch(fetchUser());
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      }
    });
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeUpdateModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const SaveData = (e) => {
    e.preventDefault();
    dispatch(formDataStore(formData))
      .then(() => {
        Swal.fire({
          title: "Data Saved!",
          text: "The Data has been Successfully Saved.",
          icon: "success",
        }).then(() => {
          dispatch(fetchUser());
          setIsOpen(false);
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "An error Occurred while Saving the data.",
          icon: "error",
        });
        console.error("Error saving data:", error);
      });
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "F/Name",
      selector: (row) => row.fname,
      sortable: true,
    },
    {
      name: "Province",
      selector: (row) => row.province,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            className="btn btn-success btn-sm"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm ms-2"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    content: {
      top: "45%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "800px",
      width: "100%",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  return (
    <>
      <div>
        <button onClick={openModal} className="btn btn-primary mt-2 ms-2">
          New
        </button>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
          ariaHideApp={false}
        >
          <div className="modal-header justify-content-between">
            <h2>Add New Students</h2>
            <button
              className="modal-close-btn btn btn-primary btn-sm bg-danger border-0"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col">
                  <form>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <label htmlFor="fname">F/Name</label>
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      className="form-control"
                      onChange={(e) =>
                        setFormData({ ...formData, fname: e.target.value })
                      }
                    />
                    <label htmlFor="province">Province</label>
                    <input
                      type="text"
                      id="province"
                      name="province"
                      className="form-control"
                      onChange={(e) =>
                        setFormData({ ...formData, province: e.target.value })
                      }
                    />
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      className="form-control"
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                    <button className="btn btn-primary mt-4" onClick={SaveData}>
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Update
          customStyles={customStyles}
          closeUpdateModal={closeUpdateModal}
          isModalOpen={isModalOpen}
          user={selectedUser}
        />
      </div>

      <DataTable
        columns={columns}
        data={users}
        title="Data Table"
        highlightOnHover
        pagination
      />
    </>
  );
}

export default Table;
