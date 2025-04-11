import React, { useState } from "react";

function CategoryModal(prop) {
  const [newCategory, setNewCategory] = useState("");
  const [rmvCategory, setRmvCategory] = useState("");

  function handleAddCategory() {
    if (newCategory.trim() !== "") {
      prop.setCategory((prev) => [...prev, newCategory]);
      setNewCategory("");
    }
  }

  function handleRmvCategory(selectedItem) {
    prop.setCategory((prev) =>
      prev.filter((cat) => {
        return cat !== selectedItem;
      })
    );
    setRmvCategory("");
  }

  return (
    <div
      class="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5"
      tabindex="-1"
      role="dialog"
      id="modalSheet"
    >
      <div class="modal-dialog " role="document">
        <div class="modal-content rounded-4 shadow modalPadding">
          <div class="modal-header border-bottom-0 position-relative">
            <h1 class="modal-title fs-5 text-center w-100">
              Customize Categories
            </h1>
            <button
              type="button"
              class="btn-close position-absolute end-0 top-50 translate-middle-y"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                prop.setShowModal(false);
              }}
            ></button>
          </div>

          {prop.category.map((item) => {
            return (
              <div class="modal-body py-0 mb-3 switchStack justify-content-between">
                <h3>{item}</h3>
                <button
                  type="button"
                  class="btn btn-lg btn-danger"
                  onClick={() => handleRmvCategory(item)}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div class="modal-body py-0 mb-3 switchStack justify-content-between">
            <input
              type="text"
              name="newCategory"
              className="form-control length"
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
