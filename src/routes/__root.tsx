import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { AuthContext } from '../hooks/useAuth'
import { Text } from "@chakra-ui/react"
import { useAuth } from '../hooks/useAuth'

const activeProps = {
    style: {
        fontWeight: "bold",
    }
}

type RouterContext = {
    authentication: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <>
            <div className='p-[1rem] px-[3rem] bg-[#1c301c] flex items-center justify-between track'>
                <Link to='/'>
                    <Text fontWeight='bold' fontSize='2xl' color='#B1D8B7'>
                        PokéAppi
                    </Text>
                </Link>
                <ol>
                    <li className="inline-block mx-[1rem] text-[#B1D8B7]">
                        <Link to="/" activeProps={activeProps}>
                            Página Inicial
                        </Link>
                    </li>
                    <li className="inline-block mx-[1rem] text-[#B1D8B7]">
                        <Link to="/configuracoes" activeProps={activeProps}>
                            Configurações
                        </Link>
                    </li>
                    <li className="inline-block mx-[1rem] text-[#B1D8B7]">
                        <Link to="/search" activeProps={activeProps}>
                            Pesquisa
                        </Link>
                    </li>
                    <li className="inline-block mx-[1rem] text-[#B1D8B7]">
                        <Link to="/pokemon/pokemonList" activeProps={activeProps}>
                            Pokémon
                        </Link>
                    </li>
                    <li className="inline-block mx-[1rem] text-[#B1D8B7]">
                        <Link to="/salvos" activeProps={activeProps}>
                            Salvos
                        </Link>
                    </li>
                    { useAuth().isLogged() ?
                    <li className="inline-block mx-[1rem] text-[#B1D8B7]">
                        <Link to="/profile" activeProps={activeProps}>
                            Perfil
                        </Link>
                    </li>
                    :
                    <li className="inline-block mx-[1rem] text-[#B1D8B7]">
                        <Link to="/login" activeProps={activeProps}>
                            Login
                        </Link>
                    </li>
                    }
                </ol>
            </div>
            <Outlet />
        </>
    ),
})