type PokemonDetail = {
    name: string;
    id: number;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
};

export async function getPokemon(id:string): Promise<PokemonDetail> { 
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await res.json();
}

type Pokemon = {
    id: string;
    name: string;
}

export async function getPokemonList(): Promise<Pokemon[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const data = (await res.json()) as {
        results: { name: string; url: string}[];
    };
    
    return data.results.map((r) => ({
        id: r.url.split("/").slice(-2, -1)[0],
        name: r.name
    }));
}