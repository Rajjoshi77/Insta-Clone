import { create } from "zustand";


const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("User-Info")) || null,
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
    setuser: (user) => set({ user }),
}));

export default useAuthStore
