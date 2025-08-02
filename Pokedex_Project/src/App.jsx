import './App.css'
import Page from './components/Page'
import Nav from './components/Nav'
import { useState } from 'react';

function App() {
  const [filteredPokemons, setFilteredPokemons] = useState([]); 

  return (
    <div className='flex flex-col gap-5 bg-blue-300'>
      <Nav onSearchResult={setFilteredPokemons}/>
      <Page pokemonsList={filteredPokemons.length > 0 ? filteredPokemons : null} />
    </div>
  )
}

export default App
