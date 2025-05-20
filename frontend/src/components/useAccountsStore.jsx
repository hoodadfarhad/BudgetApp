import { create } from 'zustand';

const useAccountStore = create((set) => ({
  cardArr: [],
  setCardArr: (cards) => set({ cardArr: cards }),
  fetchAccounts: async (userID) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/accountsGetter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner_id: userID }),
    });
    const data = await res.json();


    data.existingAccounts.forEach((item) => {
      console.log("accounts retreived in global state upon openning ADDEXP: "+ item.name);
    });

    
    

    const cardInfo = data.existingAccounts.map((item) => ({
      name: item.name,
      id: item.id,
      balance: item.new_balance,
    }));
    set({ cardArr: cardInfo });
  },
}));


export default useAccountStore;
