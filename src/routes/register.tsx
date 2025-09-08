import { createFileRoute, Link, redirect, } from '@tanstack/react-router';
import { type UserForm, userSchema } from '../hooks/useAuth';
import { AbsoluteCenter, Box, Button, Container, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { pt } from 'zod/locales';

z.config(pt());

export const Route = createFileRoute('/register')({
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

    const onSubmit: SubmitHandler<UserForm> = async (data) => {
        try {
            await new Promise((resolver) => setTimeout(resolver, 1000));
            console.log(data)
        } catch (error) {
            setError("root", {
                message: "This email is already taken",
            })
        }
    }

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<UserForm>({
        defaultValues: {
            email: "test@email.com",
        },
        resolver: zodResolver(userSchema),
    });


    return (
        <>
            <Container centerContent>
                <Box textAlign='center' position='relative' h='90vh'>
                    <AbsoluteCenter axis='both' borderRadius='lg' w='600px' p='6'>

                        <Heading size='lg'>Registre-se</Heading>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isRequired>
                                <FormLabel marginTop='3'>Nome de usuário</FormLabel>
                                <Input {...register("username")} placeholder='Escolha seu apelido' />
                            </FormControl>
                            {errors.username && <Text color="red.500">{errors.username.message}</Text>}

                            <FormControl isRequired>
                                <FormLabel marginTop='3'>Email</FormLabel>
                                <Input {...register("email")} placeholder='Digite seu email' />
                            </FormControl>
                            {errors.email && <Text color="red.500">{errors.email.message}</Text>}

                            <FormControl isRequired>
                                <FormLabel marginTop='3'>Senha</FormLabel>
                                <Input {...register("password")} type='password' placeholder='Escolha sua senha' />
                            </FormControl>
                            {errors.password && <Text color="red.500">{errors.password.message}</Text>}
                            {errors.root && <Text color="red.500">{errors.root.message}</Text>}
                            <Button bg='#94C973' margin='6' type='submit'>
                                Registrar
                            </Button>
                        </form>
                        <Heading size='md' marginTop='6'>Já possui conta? Entre agora!</Heading>
                        <Link to="/login">
                            <Button bg='#94C973' margin='6'>
                                Entrar
                            </Button>
                        </Link>
                    </AbsoluteCenter>
                </Box>
            </Container>
        </>
    )
}