import { createContext, ReactNode, useContext, useMemo } from "react";
import { useLoginModal } from "./LoginModalContext";

interface AuthContextType {
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  isAccountSetup: boolean;
  isAccountSetupPromptDismissed: boolean;
  customerId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isLoggedIn, isBootstrapping, customerId } = useLoginModal();
  const contextValue = useMemo(
    () => ({
      isAuthenticated: isLoggedIn,
      isBootstrapping,
      isAccountSetup: true,
      isAccountSetupPromptDismissed: false,
      customerId,
    }),
    [isLoggedIn, isBootstrapping, customerId],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
