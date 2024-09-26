import axios from 'axios';

export const getPokemonDetails = async (id: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.data;
};

export const getPokemonSpecies = async (speciesUrl: string) => {
  const response = await axios.get(speciesUrl);
  return response.data;
};

export const getAllPokemons = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  return response.data.results;
};

export const getPokemons = async (limit: number, offset: number) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};
