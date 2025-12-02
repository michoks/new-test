import { create } from "zustand";

interface menu {
    openMenu: boolean;
    toggleOpenMenu: () => void;
    openManageAccount: boolean;
    toggleManageAccount: () => void;
}

export const useMenuStore = create<menu>((set) => ({
    openMenu: false,
    toggleOpenMenu: () => set((state) => ({ openMenu: !state.openMenu })),

    openManageAccount: false,
    toggleManageAccount: () => set((state) => ({ openManageAccount: !state.openManageAccount }))
}))