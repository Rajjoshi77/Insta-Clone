import useAuthStore from '../store/authstore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { firestore, storage } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import useUserProfileStore from '../store/userProfileStore';
import { useState } from 'react';
import useshowToast from './useShowToast';

const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);

    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

    const showToast = useshowToast();

    const editProfile = async (inputs, selectedFile) => {
        if (isUpdating || !authUser) return;
        setIsUpdating(true);
        console.log("Started profile update...");

        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDocRef = doc(firestore, "users", authUser.uid);

        let URL = "";
        try {
            if (selectedFile) {
                console.log("Uploading image...");
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
                console.log("Image uploaded, URL: ", URL);
            }

            const updatedUser = {
                ...authUser,
                fullName: inputs.fullName || authUser.fullName,
                username: inputs.username || authUser.userName,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL,
            };

            console.log("Updating Firestore...");
            await updateDoc(userDocRef, updatedUser);
            console.log("Firestore updated");

            localStorage.setItem("User-Info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);

            showToast("Success", "Profile updated successfully", "success");
        } catch (error) {
            console.log("Error during profile update: ", error);
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
            console.log("Profile update complete");
        }
    };

    return { editProfile, isUpdating };
};

export default useEditProfile;
