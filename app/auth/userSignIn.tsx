import firebase_app from "../firebase/config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

interface UserAuthProps {
    email: string,
    password: string
}

const auth = getAuth(firebase_app);

export default async function signUp({ email, password }: UserAuthProps) {
    let result = null;
    let error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    return {
        result,
        error
    }
}