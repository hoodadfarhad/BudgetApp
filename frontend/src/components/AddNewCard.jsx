import React from "react";

function AddNewCard(prop) {
  return (
    <div>
      <li>
        <a
          class="link-body-emphasis d-inline-flex nav-link text-white rounded"
          onClick={() => {
            prop.cardSelector(3);
          }}
        >
          Add new
        </a>
      </li>
    </div>
  );
}

export default AddNewCard;
