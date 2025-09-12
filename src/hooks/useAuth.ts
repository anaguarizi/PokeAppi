import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserForm = z.infer<typeof userSchema>;

export const useAuth = () => {
  const signIn = (data: UserForm) => {
    const result = userSchema.safeParse(data)
    localStorage.setItem('isAuthenticated', 'true');
    return result;
  };

  const registerUser = (data: UserForm) => {
    const result = userSchema.safeParse(data)
    localStorage.setItem('isAuthenticated', 'true');
    return result;
  };

  const signOut = () => {
    localStorage.removeItem('isAuthenticated');
  };

  const isLogged = () => localStorage.getItem('isAuthenticated') === 'true';
  return { signIn, registerUser, signOut, isLogged };
};

export type AuthContext = ReturnType<typeof useAuth>;