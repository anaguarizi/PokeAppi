import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { AuthContext } from '../hooks/useAuth'

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
            <div className='p-[0.5rem] px-[3rem] bg-header flex items-center justify-between track'>
                <Link to='/'>
                    <h1 className="text-[2rem] text-emerald-500 font-[fantasy] font-thin tracking-wider">
                        My App
                    </h1>
                </Link>
                <ol>
                    <li className="inline-block mx-[1rem] text-emerald-100">
                        <Link to="/" activeProps={activeProps}>
                            Home
                        </Link>
                    </li>
                    <li className="inline-block mx-[1rem] text-emerald-100">
                        <Link to="/settings" activeProps={activeProps}>
                            Settings
                        </Link>
                    </li>
                    <li className="inline-block mx-[1rem] text-emerald-100">
                        <Link to="/search" activeProps={activeProps}>
                            Search
                        </Link>
                    </li>
                    <li className="inline-block mx-[1rem] text-emerald-100">
                        <Link to="/login" activeProps={activeProps}>
                            Login
                        </Link>
                    </li>
                    <li className="inline-block mx-[1rem] text-emerald-100">
                        <Link to="/pokemon" activeProps={activeProps}>
                            Pokemons
                        </Link>
                    </li>
                    <li className="inline-block mx-[1rem] text-emerald-100">
                        <Link to="/dashboard" activeProps={activeProps}>
                            Dashboard
                        </Link>
                    </li>
                    <li className="inline-block mx-[1rem] text-emerald-100">
                        <Link to="/profile" activeProps={activeProps}>
                            Profile
                        </Link>
                    </li>
                </ol>
            </div>
            <Outlet />
        </>
    ),
})