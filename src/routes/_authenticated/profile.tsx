import { createFileRoute, redirect, useRouter, } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';
import { AbsoluteCenter, Box, Button, Container, Heading } from '@chakra-ui/react';

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
  const router = useRouter();
  return (
    <Container centerContent>
      <Box textAlign='center' position='relative' h='90vh'>
        <AbsoluteCenter w='500px'>
          <Heading margin='10'>Meu perfil</Heading>
          <Button onClick={async () => {
            useAuth().signOut();
            router.navigate({ to: '/login' })
          }}
          margin='10' bg='#94C973'>
            Desconectar
          </Button>
        </AbsoluteCenter>
      </Box>
    </Container>
  )
}
