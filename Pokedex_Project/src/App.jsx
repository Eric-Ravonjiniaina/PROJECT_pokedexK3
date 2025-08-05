import './App.css'
import Page from './components/Page'
import Nav from './components/Nav'
import { useState } from 'react';

function App() {
  const [filteredPokemons, setFilteredPokemons] = useState([]); 
  const [isSearchTerm, setIsSearchTerm] = useState(false);

  return (
    <div className='flex flex-col gap-5 bg-blue-300'>
      <Nav onSearchResult={setFilteredPokemons} isSearchTerm={setIsSearchTerm}/>
      <Page pokemonsList={filteredPokemons.length > 0 ? filteredPokemons : null} isSearchTerm={isSearchTerm}/>
    </div>
  )
}

export default App
