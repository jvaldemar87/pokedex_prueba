import '@fortawesome/fontawesome-free/css/all.min.css';
import { EmblaOptionsType } from 'embla-carousel';
import React, { useEffect, useState } from 'react';
import { NavItemProps } from 'react-bootstrap';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Col, Container, Input, InputGroupText, Row } from 'reactstrap';
import EmblaCarousel from '../components/carrusel/EmblaCarrousel';
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

  const handleSelect = (eventKey: any) => alert(`selected ${eventKey}`);

  const NavItem: React.FC<NavItemProps> = ({ icon, label }) => (
    <div className="text-center">
      <i className={`${icon} text-black text-xl`}></i>
      <p className="text-sm text-black">{label}</p>
    </div>
  );

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <Container className="shadow bg-danger mt-3 mb-3">
      {/* <header className="bg-white border-b-2 border-gray-200">
      </header>
      <Nav activeKey="1" onSelect={handleSelect} >
        <Nav.Item>
          <Nav.Link eventKey="1" href="/">
          <img
            src="https://placehold.co/50x50"
            alt="Home Depot Logo"
            className="w-12 h-12"
          />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" title="Item">
          <i className="fas fa-home text-black">
            <span className="text-black">Lugar </span>
            </i>
            <span className="text-green-600"> 10PM</span>
            
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" title='Item'>
          <i className="fas fa-truck text-black">
          <span className="text-black">CP</span>
          </i>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link>
        <InputGroupText className="mt-3 mb-3 shadow">
            <Input className='mr-5'
              placeholder="Search Pokémon"
            />
            <InputGroupText className='ml-5'>
              <i className="fa-solid fa-search"></i>
            </InputGroupText>
          </InputGroupText>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="4" title='Item'>
          <NavItem icon="fas fa-box-open" label="Shop All" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="5" title='Item'>
          <NavItem icon="fas fa-tools" label="Services" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="6" title='Item'>
          <NavItem icon="fas fa-hammer" label="DIY" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="7" title='Item'>
          <NavItem icon="fas fa-user" label="Log In" />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="8" title='Item'>
          <NavItem icon="fas fa-shopping-cart" label="Cart" />
          </Nav.Link>
        </Nav.Item>
      </Nav> */}

      <EmblaCarousel slides={SLIDES} options={OPTIONS} />

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
