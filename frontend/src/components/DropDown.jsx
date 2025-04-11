import React, { useState } from "react";

function DropDown(prop) {
  function faceBtn(event) {
    prop.setFace((ghablia) => {
      return {
        ...ghablia,
        [prop.name]: event.target.dataset.value,
      };
    });
  }
  //   const [whichDropdown, setWhichDropdown] = useState(0);
  return (
    <div>
      <li>
        <a className="dropdown-item" onClick={faceBtn} data-value={prop.items}>
          {prop.items}
        </a>
      </li>
    </div>
  );
}

export default DropDown;
