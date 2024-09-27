import React, { useEffect, useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Col, Container, Input, InputGroupText, Row } from 'reactstrap';
import PokeCard from '../components/PokeCard';
import { getAllPokemons, getPokemons } from '../services/pokemonService';

const Index: React.FC = () => {
  const [pokeList, setPokeList] = useState<{ name: string, url: string }[]>([]); // pokeList será una lista de objetos con "name" y "url"
  const [allPokemons, setAllPokemons] = useState<{ name: string, url: string }[]>([]); // allPokemons también será una lista de objetos similares
  const [pokeFilter, setPokeFilter] = useState<string>(''); // pokeFilter será una cadena de texto para la búsqueda
  const [offset, setOffset] = useState<number>(0); // offset será un número para el control de la paginación
  const [limit] = useState<number>(20); // limit es un número que siempre será 20
  const [pagTotal, setPagTotal] = useState<number>(0); // pagTotal será un número para el total de páginas


  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const pokeData = await getPokemons(limit, offset);
    setPokeList(pokeData.results);
    setPagTotal(pokeData.count);

    const allPokeData = await getAllPokemons();
    setAllPokemons(allPokeData);
    //console.log(allPokeData)
  };

  const pokeSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const filterValue = pokeFilter.trim().toLowerCase();
  
      if (filterValue) {
        setPokeList([]); // Limpiar la lista antes de aplicar el filtro
  
        setTimeout(() => {
          const filteredPokemons = allPokemons.filter((p: { name: string }) =>
            p.name.toLowerCase().includes(filterValue)
          );
          setPokeList(filteredPokemons);
        }, 100);
      } else {
        setPokeList([]);
        resetToPaginatedList(); // Si el filtro está vacío, restaurar la lista original
      }
    }
  };
  
  
  

  const resetToPaginatedList = async () => {
    const pokeData = await getPokemons(limit, offset);
    setPokeList(pokeData.results);
  };

  const goPage = async (p: number) => {
    setOffset((p - 1) * limit);
    const pokeData = await getPokemons(limit, (p - 1) * limit);
    setPokeList(pokeData.results);
  };

  return (
    <Container className="shadow bg-danger mt-3">
      <Row>
        <Col>
          <InputGroupText className="mt-3 mb-3 shadow">
            <InputGroupText>
              <i className="fa-solid fa-search"></i>
            </InputGroupText>
            <Input
              value={pokeFilter}
              onChange={(e) => setPokeFilter(e.target.value)}
              onKeyDown={pokeSearch}
              placeholder="Search Pokémon"
            />
          </InputGroupText>
        </Col>
      </Row>
      <Row className="mt-3">
        {pokeList.length > 0 ? (
          pokeList.map((pok: any, i: number) => (
            <PokeCard poke={pok} key={i} />
          ))
        ) : (
          <Col>
            <p>No Pokémon found.</p>
          </Col>
        )}
        <PaginationControl last limit={limit} total={pagTotal} page={offset / limit + 1} changePage={goPage} />
      </Row>
    </Container>
  );
};

export default Index;
