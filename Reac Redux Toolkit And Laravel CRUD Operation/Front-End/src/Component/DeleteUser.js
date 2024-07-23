import React from "react";

const DeleteUser = ({userId }) => {
  
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
                className="modal-close-btn btn btn-primary btn-sm bg-danger border-0 "
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
                      <button
                        className="btn btn-primary mt-4"
                        onClick={SaveData}
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>;

  


  
};

export default DeleteUser;
