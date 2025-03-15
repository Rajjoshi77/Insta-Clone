import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authstore";
import useshowToast from "./useShowToast";


const useLogin = () => {
    const showToast = useshowToast();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(Auth);

    const loginUser = useAuthStore((state) => state.login);
    const login = async (inputs) => {

        if (!inputs.email || !inputs.password) {
            return showToast("Error", "Please fill All field", "error")
        }

        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem("User-Info", JSON.stringify(docSnap.data()))
                loginUser(docSnap.data());
                showToast("Success", "Successfully Logged In", "success")
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }
    return { loading, error, login };
}

export default useLogin
