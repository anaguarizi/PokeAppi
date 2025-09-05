export type PokemonDetail = {
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
    img: string;
}

export async function getPokemonList(loadedQnt: number): Promise<Pokemon[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=45&offset=${loadedQnt}`);
    const data = (await res.json()) as {
        results: { name: string; url: string}[];
    };
    
    return data.results.map((r) => {
        const id = r.url.split("/").slice(-2, -1)[0];
        return {
        id,
        name: r.name,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }});
}