import { StateCreator } from 'zustand';

export type GuestModeSlice = {
  isGuestMode: boolean;
  setGuestMode: (value: boolean) => void;
};

export const guestModeSlice: StateCreator<GuestModeSlice> = (set) => ({
  isGuestMode: false,
  setGuestMode: (value) => set({ isGuestMode: value }),
});
