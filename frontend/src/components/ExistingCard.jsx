import React from "react";
import useAccountStore from './useAccountsStore';


function ExistingCard(prop) {



  return (
    <li>
      <a
        class="link-body-emphasis d-inline-flex nav-link text-white rounded"
        onClick={() => {
        //  console.log(prop.cardID);
        {prop.isSmallScreen? prop.setShowSidebar(false) : null}
         prop.setAccNumber(prop.cardID)
          prop.cardsSelector(prop.cardID);
        }}
      >
        {prop.name}
      </a>
    </li>
  );
}

export default ExistingCard;
