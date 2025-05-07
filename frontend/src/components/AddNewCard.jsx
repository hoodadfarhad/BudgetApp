import React, { useEffect } from "react";
import useCardEditStore from "./useCardEditStore";

function AddNewCard(prop) {

  const { setController } = useCardEditStore();

  // useEffect(() => {
  // function reqChanger() {
  //   prop.setModifyCardData((prev)=>({
  //     ...prev,
  //     cardEditRequested: false
  //   }))
  // }
  // }, [])


  return (
    <div>
      <li>
        <a
          className="link-body-emphasis d-inline-flex nav-link text-white rounded"
          onClick={() => {
            
            setController(true); // so that its not a modify req, but its a create new req
            
            prop.cardSelector(3);
            // console.log("hoyyyyyy "+ prop.modifyCardData.cardEditRequested);
            
          }}
        >
          Add new
        </a>
      </li>
    </div>
  );
}

export default AddNewCard;
