import { useEffect, useState } from 'react';
import '../CSS/card.css';

export default function SectionCard() {
  const [pokemons, setPokemons] = useState([]);
  const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=6');
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  useEffect(() => {
    fetch(currentUrl)
      .then(response => response.json())
      .then(data => {
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        const pokemonPromises = data.results.map(pokemon =>
          fetch(pokemon.url).then(res => res.json())
        );
        Promise.all(pokemonPromises).then(pokemonDetails => {
          setPokemons(pokemonDetails);
        });
      })
      .catch(error => console.error('Erreur:', error));
  }, [currentUrl]);

  const goToNextPage = () => {
    if (nextUrl) setCurrentUrl(nextUrl);
  };

  const goToPrevPage = () => {
    if (prevUrl) setCurrentUrl(prevUrl);
  };

  return (
    <div className="App">
      <input type="text" className='pokemon-cherche' placeholder='Rechercher....'/>
      <div className="pokemon-grid">
        {pokemons.length > 0 ? (
          
          pokemons.map(pokemon => (
            
            <div key={pokemon.id} className="pokemon-card">

              <h3 className='pokemon-id'>#{pokemon.id} </h3>
              <img
                src={pokemon.sprites?.front_default || ''}
                alt={pokemon.name || 'Pokemon'}
              />
              <h3>{pokemon.name || 'Unknown'}</h3>
              <div>
                {pokemon.types && pokemon.types.length > 0 ? (
                  pokemon.types.map(type => (
                    <span key={type.type.name} className={`type ${type.type.name}`}>
                      {type.type.name}
                    </span>
                  ))
                ) : (
                  <span className="type">Unknown</span>
                )}
              </div>

            </div>

          ))
        ) : (
          <p>Chargement...</p>
        )}
      </div>


      <div className="pagination">
        <button onClick={goToPrevPage} disabled={!prevUrl}>
          Prev
        </button>
        <button onClick={goToNextPage} disabled={!nextUrl}>
          Next
        </button>
      </div>


    </div>
  );
}

