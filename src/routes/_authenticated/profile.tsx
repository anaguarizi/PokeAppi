import { createFileRoute, redirect } from '@tanstack/react-router'

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
  return <div>Hello "/profile"!</div>
}
