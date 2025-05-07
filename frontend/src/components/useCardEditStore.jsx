import { create } from 'zustand';

const useCardEditStore = create((set) => ({
  controller: false,
  setController: (value) => set({ controller: value }),
}));

export default useCardEditStore;
