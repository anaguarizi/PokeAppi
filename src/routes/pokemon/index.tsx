import { createFileRoute, Link } from '@tanstack/react-router'
import { getPokemonList, getPokemon } from '../../api/pokemon';

export const Route = createFileRoute('/pokemon/')({
  component: Pokemonlist,
  loader: getPokemonList
})

function Pokemonlist() {
  const pokemons = Route.useLoaderData();
  return (
    <>
      <div className='my-[1rem]'>
        <ul className='flex justify-around'>
          {pokemons.map((pokemon) => (
            <li key={pokemon.id} className='hover:font-bold hover:text-emerald-800'>
              <Link to={'/pokemon/$id'} params={{ id: pokemon.id }}>
                {pokemon.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}