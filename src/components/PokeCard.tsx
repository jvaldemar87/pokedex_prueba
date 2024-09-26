import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardFooter, CardImg, Col } from 'reactstrap';

// Define las props que PokeCard espera recibir
interface PokeCardProps {
  poke: {
    name: string;
    url: string;
  };
}

const PokeCard: React.FC<PokeCardProps> = ({ poke }) => {
  // Define el tipo de datos que el estado 'pokemon' manejará
  const [pokemon, setPokemon] = useState<any>(null); 
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

  if (loading) {
    return (
      <Col sm="4" lg="3" className="mb-3">
        <Card className="shadow border-4 border-warning">
          <CardImg src="/img/loading.gif" height="200" className="p-3" alt="Loading..." />
        </Card>
      </Col>
    );
  }

  if (!pokemon) {
    return null; 
  }

  return (
    <Col sm="4" lg="3" className="mb-3">
      <Card className="shadow border-4 border-warning">
        <CardImg
          src={pokemon.sprites?.front_default} 
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
