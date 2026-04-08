import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export interface AuthState {
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  principalText: string | null;
  login: () => void;
  logout: () => void;
}

export function useAuth(): AuthState {
  const { identity, login, clear, isInitializing, isLoggingIn } =
    useInternetIdentity();

  const isAuthenticated = !!identity;
  const principalText = identity ? identity.getPrincipal().toText() : null;

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    principalText,
    login,
    logout: clear,
  };
}
