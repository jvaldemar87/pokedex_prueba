// Define la interfaz para los datos de un Pokémon
export interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    height: number;
    weight: number;
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    species: { url: string };
}

// Define la interfaz para las props que recibe el componente PokeCard
export interface PokeCardProps {
    poke: {
        name: string;
        url: string;
    };
}

export interface PokemonSpecies {
    flavor_text_entries: { flavor_text: string; language: { name: string } }[];
    habitat: { name: string };
}
