import React, { useEffect, useState } from "react";
import ExistingCard from "./ExistingCard";
import AddNewCard from "./AddNewCard";
import useUserStore from './useUserStore'; // Zustand global state
import useAccountStore from './useAccountsStore';

function Cards(prop) {
  const { userID, setUserID } = useUserStore();
  const { cardArr, setCardArr } = useAccountStore();

  useEffect(() => {
    async function accountGetter() {
    
        const res = await fetch("http://localhost:5001/api/accountsGetter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ owner_id: userID }),
        });

        const data = await res.json();
        
        
        const names = data.existingAccounts.map((item) => item.name);
        console.log(names);
setCardArr(names);



        

    }

    if (userID) {
      accountGetter();
    }
  }, [cardArr]);

  return (
    <div>
      <AddNewCard cardSelector={prop.cardSelector} />
      {cardArr.map((inp, idx) => (
        <ExistingCard
          name={inp} 
          id={idx}
          key={idx}
          cardsSelector={prop.cardSelector}
        />
      ))}
    </div>
  );
}

export default Cards;
