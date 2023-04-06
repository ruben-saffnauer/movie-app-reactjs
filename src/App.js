import { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./component/MovieComponent";
import MovieInfoComponent from "./component/MovieInfoComponent";
import axios from "axios";

export const API_KEY = '8cda172e'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: #FFF;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
` 

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: #FFF;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;
`

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
` 

const SearchInput = styled.input`
  color: #000;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  gap: 24px;
` 

function App() {

  const [searchQuery, updateSearchQuery] = useState()
  const [timeOutId, updateTimeOutId] = useState()
  const [movieList, updateMovieList] = useState([])
  const [selectedMovie, onMovieSelect] = useState()

  const fetchData = async (searchString) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`)
    console.log(response)
    updateMovieList(response.data.Search)
  }

  const onTextChange = (e) => {
    clearTimeout(timeOutId)
    updateSearchQuery(e.target.value)
    const timeOut = setTimeout(() => fetchData(e.target.value), 500)
    updateTimeOutId(timeOut)
  }

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src='/movie-icon.svg'/>  
          React Movie APP
        </AppName>
        <SearchBox>
          <SearchIcon src='/search-icon.svg'/>
          <SearchInput 
            placeholder='Search Movie' 
            onChange={onTextChange}
            value={searchQuery}
          />
        </SearchBox>
      </Header>
      {selectedMovie && 
      <MovieInfoComponent 
        selectedMovie={selectedMovie}
        onMovieSelect={onMovieSelect}  
      />}
      <MovieListContainer>
        { movieList?.length ? movieList.map((movie, index) => 
        <MovieComponent 
          key={index} 
          movie={movie} 
          onMovieSelect={onMovieSelect}
        />) 
        : 'No Movie Search' }
        
      </MovieListContainer>
    </Container>
  );
}

export default App;
