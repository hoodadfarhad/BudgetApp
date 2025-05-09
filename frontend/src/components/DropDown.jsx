import React, { useState } from "react";
import useCardEditStore from "./useCardEditStore";

function DropDown(prop) {

  const { setController } = useCardEditStore();

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
      <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        setController(true);
                        prop.optionSelector(3);
                      }}
                    >
                      Add New Account
                    </a>
                  </li>
    </div>
  );
}

export default DropDown;
