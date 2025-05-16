import { create } from 'zustand';

const useReqFromAddEXP = create((set) => ({
  reqFromAddEXP: false,
  setReqFromAddEXP: (value) => set({ reqFromAddEXP: value }),
}));

export default useReqFromAddEXP;
