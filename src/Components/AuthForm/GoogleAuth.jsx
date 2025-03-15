import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Auth, firestore } from '../../firebase/firebase';
import useshowToast from '../../hooks/useshowToast';
import useAuthStore from '../../store/authstore';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const GoogleAuth = ({ prefix }) => {

    const [signInWithGoogle, error] = useSignInWithGoogle(Auth);
    const showToast = useshowToast();
    const loginuser = useAuthStore((state) => state.user)

    const handleGoogleAuth = async () => {
        try {
            const newUser = await signInWithGoogle()
            if (!newUser && error) {
                showToast("Error", error.message, "error");
                return
            }

            const UserRef = doc(firestore, "users", newUser.user.uid);
            const UserSnap = await getDoc(UserRef);

            if (UserSnap.exists()) {
                // login
                const userDoc = UserSnap.data();
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("User-Info", JSON.stringify(userDoc));
                loginuser(userDoc);

            }
            else {
                // signup
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    userName: newUser.user.email.split("@")[0],
                    fullName: newUser.user.displayName,
                    bio: "",
                    profilePicURL: newUser.user.photoURL || "https://via.placeholder.com/150",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };
                console.log(newUser.user.photoURL);
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("User-Info", JSON.stringify(userDoc));
                loginuser(userDoc);


            }

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return (
        <>
            <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'} onClick={handleGoogleAuth}>
                <Image src='/public/google.png' w={5} alt='Google logo' />
                <Text mx={2} color={'blue.500'} >{prefix} with Google</Text>
            </Flex>
        </>
    )
}

export default GoogleAuth;
