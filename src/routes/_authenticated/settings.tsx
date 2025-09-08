import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings')({
  beforeLoad: ({ context }) => {
      const { isLogged } = context.authentication;
      if (!isLogged()) {
        throw redirect({
          to: "/register",
        });
      }
    },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Configurações</div>
}
