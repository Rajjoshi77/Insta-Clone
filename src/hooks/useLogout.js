import { useSignOut } from 'react-firebase-hooks/auth';
import { Auth } from '../firebase/firebase';
import useAuthStore from '../store/authstore';
import useshowToast from './useShowToast';

const useLogout = () => {

    const [signOut, isloggingOut, error] = useSignOut(Auth);
    const showToast = useshowToast()
    const logoutuser = useAuthStore(state => state.logout)
    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('User-Info');
            logoutuser();
        } catch (error) {
            showToast("Error", error.message, "Error")
        }
    }
    return { handleLogout, isloggingOut, error }
};

export default useLogout;