import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import {
  Card, CardBody, Image, Stack, Heading, Modal, ModalContent, useDisclosure, ModalHeader,
  ModalCloseButton, ModalBody, ModalOverlay, TableContainer, Table, Thead, Tr, Th, Td,
  Button, Flex, Text, CircularProgress
} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import { getPokemon, getPokemonList, type PokemonDetail } from '../../api/pokemon';

const queryClient = new QueryClient()
export const Route = createFileRoute('/pokemon/pokemonList')({
  component: App
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokemonlist />
    </QueryClientProvider>
  )
}

function Pokemonlist() {
  const queryClient = useQueryClient()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState(0);
  let [pokemonSelecionado, setPokemonSelecionado] = useState<PokemonDetail>();

  async function detail(id: string) {
    setPokemonSelecionado(await getPokemon(id));
    onOpen();
  }

  const query = useQuery({ queryKey: ['pokemons', page], queryFn: () => getPokemonList(page * 45) })

  function handleClick(step: string) {
    if (step === 'next') {
      setPage((prev) => prev + 1)
    } else {
      setPage(page - 1)
    }
    queryClient.invalidateQueries({ queryKey: ['pokemons'] })
  }

  return (
    <>
      <Flex align='center' justify='center' gap='2rem' padding='1.5rem' bgColor='#e8ebe3'>
        {page > 0 && !query.isLoading &&
          <Button shadow='md' bgColor='#B1D8B7' onClick={() => handleClick('prev')} leftIcon={<ArrowBackIcon />}>
            <Text color='#1c301c'>
              Página anterior
            </Text>
          </Button>
        }
        {query.data?.length == 45 && !query.isLoading && <Button shadow='md' bgColor='#B1D8B7' onClick={() => handleClick('next')} rightIcon={<ArrowForwardIcon />}>
          <Text color='#1c301c'>
            Próxima página
          </Text>
        </Button>}
      </Flex>
      {query.isLoading &&
        <Flex align='center' justify='center'>
          <CircularProgress isIndeterminate />
        </Flex>
      }
      <ul className='grid grid-cols-9 bg-[#e8ebe3]'>
        {query.data?.map((pokemon) => (
          <div>
            <li key={pokemon.id} className='hover:text-[#1c301c] text-center mb-[3rem] mx-[1rem]' onClick={() => detail(pokemon.id)}>
              <button>
                <Card shadow='md' bgColor='#f1f3ed'>
                  <CardBody className='hover:text-emerald-800 hover:cursor-pointer'>
                    <Image src={pokemon.img} alt={pokemon.name} className='m-auto' />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{pokemon.name}</Heading>
                    </Stack>
                  </CardBody>
                </Card>
              </button>
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
  );
}