import { AbsoluteCenter, Box, Button, Container, FormLabel, Heading, Input } from '@chakra-ui/react';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useAuth, userSchema, type UserForm } from '../hooks/useAuth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter();

  const handleLogin: SubmitHandler<UserForm> = (data) => {
    const result = useAuth().signIn(data);
    console.log(result)
    router.navigate({to: '/profile'})
  }

  const {
          register,
          handleSubmit,
      } = useForm<UserForm>({
          resolver: zodResolver(userSchema),
      });

  return (
    <Container centerContent>
      <Box textAlign='center' position='relative' h='90vh'>
        <AbsoluteCenter axis='both' borderRadius='lg' w='500px' p='6'>

          <form onSubmit={handleSubmit(handleLogin)}>
            <Heading size='lg'>Entrar</Heading>
            
            <FormLabel marginTop='3'>Usuário/email</FormLabel>
            <Input {...register("email")} placeholder='Nome de usuário ou email' />

            <FormLabel marginTop='3'>Senha</FormLabel>
            <Input {...register("password")} type='password' placeholder='Digite sua senha' />

            <Button type='submit' bg='#94C973' margin='6'>
              Entrar
            </Button>

            <Heading size='md'>
              Ainda não possui uma conta? Registre-se agora!
            </Heading>
            <Link to="/register">
              <Button bg='#94C973' margin='6'>
                Registrar
              </Button>
            </Link>
          </form>
        </AbsoluteCenter>
      </Box>
    </Container>
  )
}
