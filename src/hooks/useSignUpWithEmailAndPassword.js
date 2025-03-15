import { useCreateUserWithEmailAndPassword } from "/node_modules/.vite/deps/react-firebase-hooks_auth.js?v=6dd679d2";
import { Auth, firestore } from "/src/firebase/firebase.js";
import { collection, doc, getDocs, query, setDoc, where } from "/node_modules/.vite/deps/firebase_firestore.js?v=6dd679d2";
import useshowToast from "/src/hooks/useShowToast.js";
import useAuthStore from "/src/store/authStore.js";

const useSignUpWithEmailAndPassword = () => {

    const [
        createUserWithEmailAndPassword,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(Auth);

    const showToast = useshowToast();
    const loginUser = useAuthStore(state => state.login);

    const signup = async (inputs) => {


        if (!inputs.email || !inputs.password || !inputs.userName || !inputs.fullName) {
            showToast("Error", "Please Fill All The Fields Properly", "error");
            return;
        }

        // Validate password length before API calls
        if (inputs.password.length < 6) {
            showToast("Error", "Password must be at least 6 characters long", "error");
            return;
        }

        // Check if the username already exists
        const userRef = collection(firestore, "users");
        const q = query(userRef, where("userName", "==", inputs.userName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            showToast("Error", "Username Already Exist", "error");
            return;
        }

        try {
            const newuser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

            if (!newuser) {
                showToast("Error", error?.message || "Error creating user", "error");
                return;
            }

            const userDoc = {
                uid: newuser.user.uid,
                email: inputs.email,
                userName: inputs.userName,
                fullName: inputs.fullName,
                bio: "",
                profilePicURL: "",
                followers: [],
                following: [],
                posts: [],
                createdAt: Date.now(),
            };

            await setDoc(doc(firestore, "users", newuser.user.uid), userDoc);
            localStorage.setItem("User-Info", JSON.stringify(userDoc));
            loginUser(userDoc);

        } catch (Err) {

            showToast("Error", Err.message, "error");
        }
    };

    return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
