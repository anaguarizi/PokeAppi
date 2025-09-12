import { createFileRoute, redirect } from '@tanstack/react-router'
import { getPokemon, useFavoritePokemon, type PokemonDetail } from '../../api/pokemon';
import { Card, CardBody, Flex, Heading, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Table, TableContainer, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa';
import { useState } from 'react';

export const Route = createFileRoute('/_authenticated/salvos')({
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [pokemonSelecionado, setPokemonSelecionado] = useState<PokemonDetail>();
  const favoritePokemon = useFavoritePokemon((state) => state.pokemon)
  const removePokemon = useFavoritePokemon((state) => state.removePokemon)

  async function detail(id: string) {
    setPokemonSelecionado(await getPokemon(id));
    onOpen();
  }

  return (
    <>
    <Flex align='center' justify='center' gap='2rem' padding='1.5rem' bgColor='#e8ebe3'>
      <Heading>Favoritos</Heading>
    </Flex>
    <ul className='grid grid-cols-9 bg-[#e8ebe3] h-[82vh]'>
      {favoritePokemon.map((pokemon) => (
        <div>
          <li key={pokemon.id} className='text-center mb-[3rem] mx-[1rem]'>
            <Card shadow='md' bgColor='#f1f3ed'>
              <CardBody className='hover:text-emerald-800 hover:cursor-pointer'>
                <IconButton aria-label='Favoritar' icon={<FaHeart />} size='lg' variant='link' padding='0.5rem' _hover={{ bg: '#B1D8B7' }}
                  onClick={() => removePokemon(pokemon.id)} />
                <br />
                <button onClick={() => detail(pokemon.id)}>
                  <Image src={pokemon.img} alt={pokemon.name} className='m-auto' />
                  <Stack mt='6' spacing='3'>
                    <Heading size='md'>{pokemon.name}</Heading>
                  </Stack>
                </button>
              </CardBody>
            </Card>
          </li>
        </div>
      ))}
    </ul>
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader className='font-[30px]'>
                {pokemonSelecionado?.name} ({pokemonSelecionado?.id})
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Image src={pokemonSelecionado?.sprites?.front_default} alt={pokemonSelecionado?.name} className='m-auto' />
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th isNumeric>Height</Th>
                        <Th isNumeric>Weight</Th>
                      </Tr>
                      <Tr>
                        <Td isNumeric>{Number(pokemonSelecionado?.height) / 10}m</Td>
                        <Td isNumeric>{Number(pokemonSelecionado?.weight) / 10}kg</Td>
                      </Tr>
                    </Thead>
                  </Table>
                </TableContainer>
              </ModalBody>
            </ModalContent>
          </Modal>
      </>
  )
}
