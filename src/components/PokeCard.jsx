import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardFooter, CardImg, Col } from 'reactstrap';

const PokeCard = (params) => {
  const [pokemon, setPokemon] = useState(null);  // Mejor manejo de estado, ahora será un objeto
  const [loading, setLoading] = useState(true);  // Estado de carga

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    const pokelink = params.poke.url;
    try {
      const response = await axios.get(pokelink);
      setPokemon(response.data);
      setLoading(false); // Quitamos el estado de carga una vez que los datos están listos
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
      setLoading(false); // Incluso en caso de error, quitamos el estado de carga
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
    return null; // Evita renderizar la tarjeta si no se obtuvo un Pokémon
  }

  return (
    <Col sm="4" lg="3" className="mb-3">
      <Card className="shadow border-4 border-warning">
        <CardImg
          src={pokemon.sprites.front_default} // Aquí se usa la imagen del Pokémon
          height="250"
          className="p-2"
          alt={pokemon.name}
        />
        <CardBody className="text-center">
          <Badge pill color="danger"># {pokemon.id}</Badge>
          <label className="fs-4 text-capitalize">{pokemon.name}</label>
        </CardBody>
        <CardFooter className="bg-warning text-center">
          <Link to={'/pokemon/'+pokemon.name} className="btn btn-dark">
            <i className="fa-solid fa-arrow-up-right-from-square"> </i> Details
          </Link>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default PokeCard;
