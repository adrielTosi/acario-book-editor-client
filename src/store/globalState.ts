import create from "zustand";

export type GlobalState = {};

export const useStore = create<GlobalState>((set) => ({}));
