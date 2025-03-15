import { create } from "zustand";


const useUserProfileStore = create((Set) => ({
    userPorfile: null,
    setUserProfile: (userProfile) => Set({ userProfile }),
    // addpost()
}))

export default useUserProfileStore;