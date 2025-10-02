import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";


interface LoginModalContextType{
    isLoginOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
    isLoggedIn: boolean;
    loginUser: (user:string) => void;
    authUser: string;
    logoutUser: (user:string) => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

interface LoginModalProviderProps{
    children: ReactNode;
}

export function LoginModalProvider({ children }: LoginModalProviderProps){
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authUser, setAuthUser] = useState("");
     

    const loginUser = useCallback((user:string) => {
        console.log("username from callback "+user);
        setAuthUser(user);
        localStorage.setItem("username", user);
        setIsLoggedIn(true);
        
    }, []);

    const logoutUser = useCallback((user:string) => {
        console.log("logging "+user+" out");
        setAuthUser("");
        const username = localStorage.getItem("username");
        username == user ? localStorage.removeItem("username"):'';
        setIsLoggedIn(false);
    }, [])

    useEffect(() => {
        if(localStorage.getItem("username") != ""){
            
            const storedUser = localStorage.getItem("username");
            if(storedUser){
                setIsLoggedIn(true);
                setAuthUser(storedUser);
            }
        }
    }, []   )
    const openLogin = useCallback(() => setIsLoginOpen(true), []);
    const closeLogin = useCallback(() => setIsLoginOpen(false), []);

   //memoize context values
   const contextValue = useMemo(() => ({
    isLoggedIn,
    loginUser,
    isLoginOpen,
    openLogin,
    closeLogin,
    authUser,
    logoutUser
   }), [isLoggedIn, loginUser, isLoginOpen, openLogin, closeLogin, authUser, logoutUser]);
    

    return (
        <LoginModalContext.Provider value={contextValue}>
            {children}
        </LoginModalContext.Provider>
    );
}

export function useLoginModal(): LoginModalContextType{
    const ctx = useContext(LoginModalContext);
    if(!ctx) throw new Error("useLoginModal must be used inside LoginModalProvider");
    return ctx;
}