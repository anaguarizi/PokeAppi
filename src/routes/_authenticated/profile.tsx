import { createFileRoute, redirect, } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';

export const Route = createFileRoute('/_authenticated/profile')({
  beforeLoad: ({ context }) => {
    const { isLogged } = context.authentication;
    if (!isLogged()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <p>Hello "/profile"!</p>
      <button onClick={async () => {
        useAuth().signOut();
      }}
      >
        Sign out
      </button>
    </div>
  )
}
