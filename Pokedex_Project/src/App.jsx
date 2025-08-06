import './App.css'
import Page from './components/Page';
import Nav from './components/Nav';
import Details from './components/details';
import { useState } from 'react';

function App() {
  const [filteredPokemons, setFilteredPokemons] = useState([]); 
  const [isSearchTerm, setIsSearchTerm] = useState(false);
  const [detailsUrl, setDetailsUrl] = useState(null);

  return (
    <div className='flex flex-col gap-5 bg-blue-300'>
      <Nav onSearchResult={setFilteredPokemons} isSearchTerm={setIsSearchTerm}/>
      {detailsUrl && (
        <Details pokemonUrl={detailsUrl} onClose={() => setDetailsUrl(null)} />
      )}
      {!detailsUrl &&(
        <Page pokemonsList={filteredPokemons.length > 0 ? filteredPokemons : null} isSearchTerm={isSearchTerm} sendUrl={setDetailsUrl}/>
      )}
      
    </div>
  )
}

export default App
