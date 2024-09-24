import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Col, Container, Input, InputGroupText, Row } from 'reactstrap';
import PokeCard from '../components/PokeCard';


const Index = () => {
  const [pokemons,setPokemons] = useState([])
  const [allPokemons,setAllPokemons] = useState([])
  const [pokeList,setPokeList] = useState([])
  const [pokeFilter,setPokeFilter] = useState('')
  const [offset,setOffset] = useState(0)
  const [limit,setLimit]= useState(20)
  const [pagTotal,setPagTotal]= useState(0)

  useEffect(()=>{
    getPokemons(offset)
    getAllPokemons()
  },[])

  const getPokemons = async(o) =>{
    const pokelink = 'https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+o
    axios.get(pokelink).then(async(response) =>{
      const pokeResponse = response.data
      setPokemons(pokeResponse.results)
      setPokeList(pokeResponse.results)
      setPagTotal(pokeResponse.count)
    })
  }

  const getAllPokemons = async() =>{
    const pokelink = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    axios.get(pokelink).then(async(response) =>{
      const pokeResponse = response.data
      setAllPokemons(pokeResponse.results)
    })
  }

  const pokeSearch = async (e) => {
    if (e.keyCode == 13) {
      if (pokeFilter.trim() != '') {
        setPokeList([])
        setTimeout( () => {
          setPokeList(allPokemons.filter(p => p.name.includes(pokeFilter)))
        },100
        )
      }
    }
    else if (pokeFilter.trim() == '') {
      setPokeList([])
      setTimeout(() => {
        setPokeList(pokemons)
      }, 100);
    }
  }

  const goPage = async(p) => {
    setPokeList([])
    await getPokemons( (p==1) ? 0 : ((p-1)*20))
    setOffset(p)
  }

  return (
    <Container className="shadow bg-danger mt-3">
      <Row>
        <Col>
          <InputGroupText className="mt-3 mb-3 shadow" >
            <InputGroupText><i className="fa-solid fa-search"></i></InputGroupText>
            <Input value={pokeFilter} onChange={(e) => {setPokeFilter(e.target.value)}} onKeyDownCapture={pokeSearch} placeholder="search pokemon"></Input>
          </InputGroupText>
        </Col>
      </Row>
      <Row className='mt-3'>
        { pokeList.map( (pok,i) => (
          <PokeCard poke = {pok} key={i}></PokeCard>
         ) )
        }
        <PaginationControl last={true} limit={limit} total={pagTotal} page={offset} changePage={page => goPage(page)}></PaginationControl>
      </Row>
    </Container>
  )
}

export default Index