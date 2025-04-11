import React from "react";

function ExistingCard(prop) {
  return (
    <li>
      <a
        class="link-body-emphasis d-inline-flex nav-link text-white rounded"
        onClick={() => {
          prop.cardsSelector(4);
        }}
      >
        {prop.bank + " " + prop.name}
      </a>
    </li>
  );
}

export default ExistingCard;
