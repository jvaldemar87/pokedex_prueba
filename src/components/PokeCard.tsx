import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardFooter, CardImg, Col } from 'reactstrap';
import { PokeCardProps, Pokemon } from '../interfaces/PokeTypes'; // Importamos las interfaces desde 'types.ts'

const PokeCard: React.FC<PokeCardProps> = ({ poke }) => {
  const [pokemon, setPokemon] = useState<unknown>(null); // Cambiamos a 'unknown' para seguridad
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    try {
      const response = await axios.get(poke.url);
      setPokemon(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setLoading(false);
    }
  };

  // Función para verificar si el objeto es un Pokémon válido
  const isPokemon = (data: unknown): data is Pokemon => {
    return typeof data === 'object' && data !== null && 'id' in data && 'name' in data && 'sprites' in data;
  };

  if (loading) {
    return (
      <Col sm="4" lg="3" className="mb-3">
        <Card className="shadow border-4 border-warning">
          <CardImg src="/img/loading.gif" height="200" className="p-3" alt="Loading..." />
        </Card>
      </Col>
    );
  }

  // Verificamos que el objeto pokemon tenga la estructura que esperamos
  if (!pokemon || !isPokemon(pokemon)) {
    return null; 
  }

  return (
    <Col sm="4" lg="3" className="mb-3">
      <Card className="shadow border-4 border-warning">
        <CardImg
          src={pokemon.sprites.front_default} 
          height="250"
          className="p-2"
          alt={pokemon.name}
        />
        <CardBody className="text-center">
          <Badge pill color="danger"># {pokemon.id}</Badge>
          <label className="fs-4 text-capitalize">{pokemon.name}</label>
        </CardBody>
        <CardFooter className="bg-warning text-center">
          <Link to={`/pokemon/${pokemon.name}`} className="btn btn-dark">
            <i className="fa-solid fa-arrow-up-right-from-square"> </i> Details
          </Link>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default PokeCard;
