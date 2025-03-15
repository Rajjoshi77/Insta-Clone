import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/authstore';
import useUserProfileStore from '../store/userProfileStore';
import useshowToast from './useShowToast';

import { firestore } from '../firebase/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';

const useFollowUser = (userId) => {
    const [isUpdating, setIsupdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setuser);
    const { userProfile, setUserProfile } = useUserProfileStore();
    const showToast = useshowToast();

    const handleFollowUser = async () => {
        setIsupdating(true)
        try {
            const currentUserRef = doc(firestore, 'users', authUser.uid)
            const UserToFollowOrUnfollow = doc(firestore, 'users', userId)

            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            })

            await updateDoc(UserToFollowOrUnfollow, {
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })

            if (isFollowing) {
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userId)
                });

                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(uid => uid !== authUser.uid)
                });

                localStorage.setItem("User-Info", JSON.stringify({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userId)
                }));

                setIsFollowing(false)
            } else {
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId]
                });

                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, authUser.uid]
                });

                localStorage.setItem("User-Info", JSON.stringify({
                    ...authUser,
                    following: [...authUser.following, userId]
                }));

                setIsFollowing(true)
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        }
        finally {
            setIsupdating(false)
        }


    }

    useEffect(() => {

        if (authUser) {
            const isFollowing = authUser.following.includes(userId)
            setIsFollowing(isFollowing)
        }
    }, [authUser, userId])
    return { isUpdating, isFollowing, handleFollowUser };
}

export default useFollowUser
