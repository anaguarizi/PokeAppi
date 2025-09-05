import { redirect } from "@tanstack/react-router";

export const useAuth = () => {
  const signIn = () => {
    localStorage.setItem('isAuthenticated', 'true');
    throw redirect({
    to: "/profile",
  });
  };

  const signOut = () => {
    localStorage.removeItem('isAuthenticated');
  };

  const isLogged = () => localStorage.getItem('isAuthenticated') === 'true';

  return { signIn, signOut, isLogged };
};

export type AuthContext = ReturnType<typeof useAuth>;