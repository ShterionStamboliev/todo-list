'use client'

import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "firebase/auth";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

type ChildrenProps = {
    children: React.ReactNode
};

export const AuthProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}