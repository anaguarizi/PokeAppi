import { createFileRoute } from '@tanstack/react-router'
import { getPokemon } from '../../api/pokemon';

export const Route = createFileRoute('/pokemon/$id')({     // o id no caminho é passado para o params usado no loader com o mesmo nome (no caso, id)
  component: Pokemon,                                      // chama o componente Pokemon, definido na função abaixo
  loader: async ({params}) => await getPokemon(params.id), // chamar o LOADER aqui garante que a informação (pokemon) chegue no componente de rota antes que ele renderize
})

function Pokemon() {
  const {id} = Route.useParams();                          // HOOK para pegar os parâmetros usados no loader
  const pokemon = Route.useLoaderData();                   // HOOK para pegar a informação do loader, que carregou antes de renderizar o componente
  return <div>
      <h2>{pokemon.name} (ID {id})</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
}
