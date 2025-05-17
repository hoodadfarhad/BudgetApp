import React, { useEffect, useState } from "react";
import useCardEditStore from "./useCardEditStore";
import useReqFromAddEXP from "./useReqFromAddEXP";


function AddNewCard(prop) {

  const { setController } = useCardEditStore();

  const { setReqFromAddEXP } = useReqFromAddEXP();
 

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
            {prop.isSmallScreen? prop.setShowSidebar(false) : null}
            setController(true); // so that its not a modify req, but its a create new req
            setReqFromAddEXP(false);
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
