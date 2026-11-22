import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";


interface LoginModalContextType{
    isLoginOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
    isLoggedIn: boolean;
    isBootstrapping: boolean;
    loginUser: (user:string, customerId?: string) => void;
    authUser: string;
    customerId: string | null;
    logoutUser: (user:string) => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

interface LoginModalProviderProps{
    children: ReactNode;
}

export function LoginModalProvider({ children }: LoginModalProviderProps){
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isBootstrapping, setIsBootstrapping] = useState(true);
    const [authUser, setAuthUser] = useState("");
    const [customerId, setCustomerId] = useState<string | null>(null);
     

    const loginUser = useCallback((user:string, nextCustomerId?: string) => {
        console.log("username from callback "+user);
        setAuthUser(user);
        localStorage.setItem("username", user);
        if (nextCustomerId) {
            localStorage.setItem("customerId", nextCustomerId);
        } else {
            localStorage.removeItem("customerId");
        }
        setCustomerId(nextCustomerId ?? null);
        setIsLoggedIn(true);
        
    }, []);

    const logoutUser = useCallback((user:string) => {
        console.log("logging "+user+" out");
        setAuthUser("");
        const username = localStorage.getItem("username");
        if (username === user) {
            localStorage.removeItem("username");
            localStorage.removeItem("customerId");
        }
        setCustomerId(null);
        setIsLoggedIn(false);
    }, [])

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) {
            setIsLoggedIn(true);
            setAuthUser(storedUser);
            setCustomerId(localStorage.getItem("customerId"));
        }
        setIsBootstrapping(false);
    }, []);
    const openLogin = useCallback(() => setIsLoginOpen(true), []);
    const closeLogin = useCallback(() => setIsLoginOpen(false), []);

   //memoize context values
   const contextValue = useMemo(() => ({
    isLoggedIn,
    isBootstrapping,
    loginUser,
    isLoginOpen,
    openLogin,
    closeLogin,
    authUser,
    customerId,
    logoutUser
   }), [isLoggedIn, isBootstrapping, loginUser, isLoginOpen, openLogin, closeLogin, authUser, customerId, logoutUser]);
    

    return (
        <LoginModalContext.Provider value={contextValue}>
            {children}
        </LoginModalContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLoginModal(): LoginModalContextType{
    const ctx = useContext(LoginModalContext);
    if(!ctx) throw new Error("useLoginModal must be used inside LoginModalProvider");
    return ctx;
}