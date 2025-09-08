import { AbsoluteCenter, Box, Button, Container, FormLabel, Heading, Input } from '@chakra-ui/react';
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container centerContent>
      <Box textAlign='center' position='relative' h='90vh'>
        <AbsoluteCenter axis='both' borderRadius='lg' w='500px' p='6'>

          <Heading size='lg'>Entrar</Heading>
          <FormLabel marginTop='3'>Usuário/email</FormLabel>
          <Input placeholder='Nome de usuário ou email' />

          <FormLabel marginTop='3'>Senha</FormLabel>
          <Input type='password' placeholder='Digite sua senha' />

          <Link to="/login">
            <Button bg='#94C973' margin='6'>
              Entrar
            </Button>
          </Link>

          <Heading size='md'>
            Ainda não possui uma conta? Registre-se agora!
          </Heading>
          <Link to="/register">
            <Button bg='#94C973' margin='6'>
              Registrar
            </Button>
          </Link>
        </AbsoluteCenter>
      </Box>
    </Container>
  )
}
