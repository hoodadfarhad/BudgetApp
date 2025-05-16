import { create } from 'zustand';

const useUserStore = create((set) => ({
  userID: 1,
  setUserID: (id) => set({ userID: id }),
}));




export default useUserStore;