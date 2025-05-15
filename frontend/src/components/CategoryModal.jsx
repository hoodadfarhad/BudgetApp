import React, { useState } from "react";
import useUserStore from './useUserStore'; // using Zustand here - global state access

function CategoryModal(prop) {
  const [newCategory, setNewCategory] = useState("");
  const [rmvCategory, setRmvCategory] = useState("");
  const { userID, setUserID } = useUserStore();


  

 async function handleAddCategory() {
    if (newCategory.trim() !== "") {

      const res = await fetch("http://localhost:5001/api/addCategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory.trim(), owner_id: userID })
      });
      const result = await res.json();
      console.log(result);
      if (res.ok) {
        
        alert("new category added!");
      } else {
        alert("Something went wrong with adding new category.");
      }

      prop.setCategory((prev) => [...prev, newCategory.trim()]);
      // also add the new category to db
      setNewCategory("");
    }
  }

async  function handleRmvCategory(selectedItem) {


    const res = await fetch("http://localhost:5001/api/rmvCategory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: selectedItem, owner_id: userID })
    });
    const result = await res.json();
    console.log(result);
    if (res.ok) {
      
      alert(" category deleted!");
    } else {
      alert("Something went wrong with deleting the category.");
    }

    prop.setCategory((prev) =>
      prev.filter((cat) => {
        return cat !== selectedItem;
      })
    );
    // setRmvCategory("");
  }

  return (
    <div
    className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5 w-100 overflow-x-hidden"
      tabindex="-1"
      role="dialog"
      id="modalSheet"
    >
      <div className="modal-dialog w-100 modal-fullscreen-sm-down" role="document">
        <div className="modal-content w-100 rounded-4 shadow modalPadding">
          <div className="modal-header border-bottom-0 position-relative">
            <h1 className="modal-title fs-5 text-center w-100">
              Customize Categories
            </h1>
            <button
              type="button"
              className="btn-close position-absolute end-0 top-50 translate-middle-y"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                prop.setShowModal(false);
              }}
            ></button>
          </div>

          {prop.category.map((item) => {
            return (
              <div className="modal-body py-0 mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
                <h3>{item}</h3>
                <button
                  type="button"
                  className="btn btn-lg btn-danger"
                  onClick={() => handleRmvCategory(item)}
                >
                  Remove
                </button>
              </div>
            );
          })}
         <div className="modal-body py-0 mb-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">

            <input
              type="text"
              name="newCategory"
             
              className="form-control flex-grow-1"

              placeholder="Add New Category"
              onChange={(event) => setNewCategory(event.target.value)}
            />
            <button
              type="button"
              class="btn btn-lg btn-primary"
              onClick={() => {
                handleAddCategory();
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;
