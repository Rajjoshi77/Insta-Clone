import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (userName) => {
    const [isLoading, setIsLoading] = useState(true); 
    const showToast = useShowToast(); 
    const { userProfile, setUserProfile } = useUserProfileStore(); 

    useEffect(() => {
        
        if (!userName) {
            setUserProfile(null);
            setIsLoading(false);
            return;
        }

        console.log('Fetching User Profile for UserName:', userName);

        const getUserProfile = async () => {
            setIsLoading(true);
            try {
                // Query Firestore collection for matching userName
                const q = query(collection(firestore, "users"), where("userName", "==", userName));
                const querySnapshot = await getDocs(q);

                // If no documents match the query, set profile to null
                if (querySnapshot.empty) {
                    setUserProfile(null);
                    return;
                }

                // Extract the first document's data
                const userDoc = querySnapshot.docs[0].data();
                setUserProfile(userDoc);
                console.log("Fetched User Profile:", userDoc);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        getUserProfile();
    }, [userName, setUserProfile, showToast]);

    return { isLoading, userProfile };
};

export default useGetUserProfileByUsername;
