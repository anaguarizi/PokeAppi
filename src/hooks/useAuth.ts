import { redirect } from "@tanstack/react-router";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserForm = z.infer<typeof userSchema>;

export const useAuth = () => {

  const signIn = () => {
    localStorage.setItem('isAuthenticated', 'true');
    throw redirect({
      to: "/profile",
    });
  };

  const registerUser = (data: UserForm) => {
    localStorage.setItem('isAuthenticated', 'true');
    throw redirect({
      to: "/profile",
    });
  };

  const signOut = () => {
    localStorage.removeItem('isAuthenticated');
  };

  const isLogged = () => localStorage.getItem('isAuthenticated') === 'true';
  return { signIn, registerUser, signOut, isLogged };
};

export type AuthContext = ReturnType<typeof useAuth>;