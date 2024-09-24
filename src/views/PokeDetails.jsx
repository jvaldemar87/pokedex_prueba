import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardBody, CardText, Col, Container, Row } from 'reactstrap';

const PokeDetails = () => {
  const {id} = useParams()
  const [pokemon, setPokemon] = useState([])
  const [pokeSpecies, setPokeSpecies] = useState([])
  const [pokeHabitad, setPokeHabitad] = useState([])
  const [pokeDescription, setPokeDescription] = useState([])
  const [pokeImage, setPokeImage] = useState([])
  const [pokeType, setPokeType] = useState([])
  const [pokeCardClass, setPokeCardClass] = useState(['d-none'])
  const [pokeLoadClass, setPokeLoadClass] = useState('')
  
  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async() => {
    const pokeLink = 'https://pokeapi.co/api/v2/pokemon'+id
    axios.get(pokeLink).then((response) => {
      const pokeResponse = response.data
      setPokemon(pokeResponse)
      if (pokeResponse.sprites.other.dream_world.front_default != null) {
        setPokeImage(pokeResponse.sprites.other.dream_world.front_default)
      }
      else{
        setPokeImage(pokeResponse.sprites.other['official-artwork'].front_default)
      }
      setPokeCardClass('')
      setPokeLoadClass('d-none')
    })
  }

  const getPokeSpecies = async(spe) => {
    const pokeLink = 'https://pokeapi.co/api/v2/pokemon-species/'+spe
    axios.get(pokeLink).then((response) => {
      const pokeResponse = response.data
      setPokeSpecies(pokeResponse)
    })
  }

  return (
    <Container className='br-danger mt-3'>
      <Row>
        <Col>
          <Card className='shadow mt-3 mb-3'>
            <CardBody className='mt-3'>
              <Row>
                <Col className='text-end'>
                  <Link to='/' className='btn-btn-warning'>
                  <i className='fa-solid fa-home'></i>Inicio</Link>
                </Col>
              </Row>
              <Row className={pokeLoadClass}>
                <Col md='12'>
                  <img src='/img/loading2.gif'className='w-25'></img>
                </Col>
              </Row>
              <Row className={pokeCardClass}>
                <Col md='6'>
                  <CardText className='h1 text-capitalize'>{pokemon.name}</CardText>
                  <CardText className='fs-3'>{pokeDescription}</CardText>
                  <CardText className='fs-5'>Heigt: <b>{(pokemon.height)/10} m</b></CardText>
                  <CardText className='fs-5'>Weight: <b>{(pokemon.weight)/10} kg</b></CardText>
                  <CardText className='fs-5'>
                    
                  </CardText>
                </Col>
                <Col md='6'></Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default PokeDetails