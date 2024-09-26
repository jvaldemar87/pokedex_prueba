import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Card, CardBody, CardText, Col, Container, Progress, Row } from 'reactstrap';
import { getPokemonDetails, getPokemonSpecies } from '../services/pokemonService';

const PokeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<any>(null);
  const [pokeSpecies, setPokeSpecies] = useState<any>(null);
  const [pokeDescription, setPokeDescription] = useState<string>('');
  const [pokeHabitat, setPokeHabitat] = useState<string>('');
  const [pokeStatics, setPokeStatics] = useState<{ name: string; value: number }[]>([]);
  const [pokeType, setPokeType] = useState<string[]>([]);
  const [pokeHabilities, setPokeHabilities] = useState<string[]>([]);
  const [pokeImage, setPokeImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonData();
  }, [id]);

  const fetchPokemonData = async () => {
    try {
      setLoading(true);
      const pokemonData = await getPokemonDetails(id!);
      setPokemon(pokemonData);
      setPokeImage(pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default);
      setPokeType(pokemonData.types.map((t: any) => t.type.name));
      setPokeHabilities(pokemonData.abilities.map((a: any) => a.ability.name));
      setPokeStatics(pokemonData.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })));

      const speciesData = await getPokemonSpecies(pokemonData.species.url);
      setPokeSpecies(speciesData);
      setPokeHabitat(speciesData.habitat?.name || 'Unknown');
      const description = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
      setPokeDescription(description?.flavor_text || 'No description available');

      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      setLoading(false);
    }
  };

  return (
    <Container className="bg-danger mt-3 p-3 rounded">
      <Row>
        <Col>
          <Card className="shadow mt-3 mb-3">
            <CardBody className="mt-3">
              <Row>
                <Col className="text-end">
                  <Link to="/" className="btn btn-warning">
                    <i className="fa-solid fa-home"></i> Inicio
                  </Link>
                </Col>
              </Row>

              {loading ? (
                <Row className="text-center">
                  <Col>
                    <img src="/img/loading2.gif" alt="Loading" className="w-25" />
                  </Col>
                </Row>
              ) : (
                <>
                  <Row>
                    <Col md="6">
                      <CardText className="h1 text-capitalize">{pokemon.name}</CardText>
                      <CardText className="fs-3">{pokeDescription}</CardText>
                      <CardText className="fs-5">
                        Height: <b>{(pokemon.height / 10).toFixed(1)} m</b>
                      </CardText>
                      <CardText className="fs-5">
                        Weight: <b>{(pokemon.weight / 10).toFixed(1)} kg</b>
                      </CardText>
                      <CardText className="fs-5">
                        Type:
                        {pokeType.map((type, i) => (
                          <Badge pill className="me-1" color="danger" key={i}>
                            {type}
                          </Badge>
                        ))}
                      </CardText>
                      <CardText className="fs-5">
                        Abilities:
                        {pokeHabilities.map((ability, i) => (
                          <Badge pill className="me-1" color="dark" key={i}>
                            {ability}
                          </Badge>
                        ))}
                      </CardText>
                      <CardText className="fs-5 text-capitalize">
                        Habitat: <b>{pokeHabitat}</b>
                      </CardText>
                    </Col>
                    <Col md="6">
                      <img src={pokeImage} className="img-fluid" alt={pokemon.name} />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md="12">
                      <CardText className="fs-4 text-center">
                        <b>Statistics</b>
                      </CardText>
                    </Col>
                    {pokeStatics.map((stat, i) => (
                      <Row key={i}>
                        <Col xs="6" md="3">
                          <b>{stat.name}</b>
                        </Col>
                        <Col xs="6" md="9">
                          <Progress className="my-2" value={stat.value}>
                            {stat.value}
                          </Progress>
                        </Col>
                      </Row>
                    ))}
                  </Row>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PokeDetails;
