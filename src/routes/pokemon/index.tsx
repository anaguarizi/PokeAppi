import { createFileRoute } from '@tanstack/react-router'
import { getPokemon, getPokemonList, type PokemonDetail } from '../../api/pokemon';
import {
  Card, CardBody, Image, Stack, Heading, Modal, ModalContent, useDisclosure, ModalHeader,
  ModalCloseButton, ModalBody, TableContainer, Table, Thead, 
  Tr,
  Th,
  Td} from '@chakra-ui/react'
import { useState } from 'react';

export const Route = createFileRoute('/pokemon/')({
  component: Pokemonlist,
  loader: getPokemonList
})

function Pokemonlist() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [ pokemonSelecionado, setPokemonSelecionado ] = useState<PokemonDetail>();
  const pokemons = Route.useLoaderData();

  async function detail(id: string) {
    setPokemonSelecionado(await getPokemon(id));
    onOpen();
  }

  return (
    <>
      <ul className='flex flex-wrap justify-between'>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} className='size-[175px] hover:text-emerald-800 text-center mt-[3rem] mx-[1rem]' onClick={() => detail(pokemon.id)}>
            <button>
              <Card>
                <CardBody className='hover:text-emerald-800 hover:cursor-pointer'>
                  <Image src={pokemon.img} alt={pokemon.name} className='m-auto' />
                  <Stack mt='6' spacing='3'>
                    <Heading size='md'>{pokemon.name}</Heading>
                  </Stack>
                </CardBody>
              </Card>
            </button>
          </li>
        ))}
      </ul>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className='font-[30px]'>
            {pokemonSelecionado?.name} ({pokemonSelecionado?.id})
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={pokemonSelecionado?.sprites?.front_default} alt={pokemonSelecionado?.name} className='m-auto'/>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th isNumeric>Height</Th>
                    <Th isNumeric>Weight</Th>
                  </Tr>
                  <Tr>
                    <Td isNumeric>{pokemonSelecionado?.height}m</Td>
                    <Td isNumeric>{pokemonSelecionado?.weight}kg</Td>
                  </Tr>
                </Thead>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}