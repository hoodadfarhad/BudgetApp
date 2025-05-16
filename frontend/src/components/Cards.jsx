import React, { useEffect, useState } from "react";
import ExistingCard from "./ExistingCard";
import AddNewCard from "./AddNewCard";
import useUserStore from './useUserStore'; // Zustand global state
import useAccountStore from './useAccountsStore';

function Cards(prop) {
  const { userID, setUserID } = useUserStore();
  const { cardArr, setCardArr } = useAccountStore();
  const API_BASE = process.env.REACT_APP_API_BASE;
  useEffect(() => {
    async function accountGetter() {
    
        const res = await fetch(`${API_BASE}/api/accountsGetter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ owner_id: userID }),
        });

        const data = await res.json();
        
        const cardInfo = data.existingAccounts.map((item) => ({
          name: item.name,
          id: item.id,
          balance: item.new_balance
        }));
setCardArr(cardInfo);

    
        

    }

    if (userID) {
      accountGetter();
    }
  }, [cardArr]);

  return (
    <div>
      <AddNewCard cardSelector={prop.cardSelector} modifyCardData={prop.modifyCardData} setModifyCardData={prop.setModifyCardData} />
      {cardArr.map((inp, idx) => (
        <ExistingCard
          name={inp.name} 
          cardID={inp.id}
          cardBalance={inp.balance}
          accNumber={prop.accNumber} 
          setAccNumber={prop.setAccNumber}
          key={idx}
          cardsSelector={prop.cardSelector}
        />
      ))}
    </div>
  );
}

export default Cards;
