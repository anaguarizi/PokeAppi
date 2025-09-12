import { create } from 'zustand';

export type PokemonDetail = {
    name: string;
    id: number;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
};

export async function getPokemon(id: string): Promise<PokemonDetail> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await res.json();
}

type Pokemon = {
    id: string;
    name: string;
    img: string;
}

interface PokemonList {
    pokemon: Pokemon[];
    addPokemon: (pokemon: Pokemon) => void;
    removePokemon: (id: string) => void;
    searchPokemon: (id: string) => boolean;
}

export const useFavoritePokemon = create<PokemonList>((set, get) => ({
    pokemon: [],
    addPokemon: (pokemon) => {
        set((state) => ({
            pokemon: [...state.pokemon, pokemon],
        }))
        console.log(get().pokemon)
    },
    removePokemon: (id) => set((state) => ({
        pokemon: state.pokemon.filter((pokemon) => pokemon.id !== id),
    })),
    searchPokemon: (id) => {
        return get().pokemon.some((pokemon) => pokemon.id === id)
    }
}))

export async function getPokemonList(loadedQnt: number): Promise<Pokemon[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=45&offset=${loadedQnt}`);
    const data = (await res.json()) as {
        results: { name: string; url: string }[];
    };

    return data.results.map((r) => {
        const id = r.url.split("/").slice(-2, -1)[0];
        return {
            id,
            name: r.name,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }
    });
}