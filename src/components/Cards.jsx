import React from "react";
import ExistingCard from "./ExistingCard";
import AddNewCard from "./AddNewCard";

// to populate the arrays of cards - this will be moved to Node later

const cardArr = [];

function CardMaker(name, balance, bank) {
  this.accountName = name;
  this.accountBalance = balance;
  this.bankName = bank;
}

cardArr.push(new CardMaker("Saving", 4300, "TD"));
cardArr.push(new CardMaker("Chequing", 7100, "RBC"));
cardArr.push(new CardMaker("GIC", 5000, "CIBC"));

console.log(cardArr);

// up to here

function Cards(prop) {
  return (
    <div>
      <AddNewCard cardSelector={prop.cardSelector} />

      {cardArr.map((inp, idx) => {
        return (
          <ExistingCard
            name={inp.accountName}
            bank={inp.bankName}
            balance={inp.accountBalance}
            id={idx}
            key={idx}
            cardsSelector={prop.cardSelector}
          />
        );
      })}
    </div>
  );
}

export default Cards;
