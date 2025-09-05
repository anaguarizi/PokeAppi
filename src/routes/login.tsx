import { createFileRoute, redirect, } from '@tanstack/react-router';
import { useAuth } from '../hooks/useAuth';

export const Route = createFileRoute('/login')({
    beforeLoad: ({ context }) => {
        const { isLogged } = context.authentication;
        if (isLogged()) {
            throw redirect({
                to: "/profile",
            });
        }
    },
    component: Login,
});

function Login() {
    return (
        <>
            {useAuth().isLogged() ? (
                <>
                    <p>Você está loggado</p>
                    <button onClick={async () => {
                        useAuth().signOut();
                    }}>
                        Sign out
                    </button>
                </>
            ) : (
                <button onClick={async () => {
                    useAuth().signIn();
                }}>
                    Sign in
                </button>
            )
            }
        </>
    )
}