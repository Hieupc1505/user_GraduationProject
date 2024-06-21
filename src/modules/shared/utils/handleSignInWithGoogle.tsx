import { auth, googleAuthprovider } from "./firebase.setup";
import { signInWithPopup } from "firebase/auth";
const handleSignInWithFireBaseGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleAuthprovider);
        return result;
    } catch (error) {
        return null;
    }
};

export default handleSignInWithFireBaseGoogle;
