import { create } from 'zustand';

const useAccountStore = create((set) => ({
  cardArr: [],
  setCardArr: (cardArr) => set({ cardArr }),
}));

export default useAccountStore;
