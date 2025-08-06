import { useEffect, useState } from "react";
import './css/Card.css';

function Details({ pokemonUrl ,onClose}) {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
  if (!pokemonUrl) return;

  fetch(pokemonUrl)
    .then(response => response.json())
    .then(data => {
      setPokemonDetails(data);

      return fetch(data.species.url);
    })
    .then(res => res.json())
    .then(speciesData => {
      return fetch(speciesData.evolution_chain.url);
    })
    .then(res => res.json())
    .then(evolutionData => {
      const chain = [];
      let current = evolutionData.chain;

      while (current) {
        chain.push(current.species.name);
        current = current.evolves_to[0];
      }

      setEvolutionChain(chain);
    });
}, [pokemonUrl]);


  useEffect(() => {
    fetch(pokemonUrl)
      .then(response => response.json())
      .then(data => {
        setPokemonDetails(data);
      });
  }, [pokemonUrl]);

  if (!pokemonDetails) {
    return <div className="text-center text-xl mt-10">Chargement...</div>;
  }

  return (
    <div className="w-1/2 mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <button
        onClick={onClose}
        className="relative bg-yellow-250 text-black px-4 py-2 rounded">
        {"< Back"}
      </button>
      <div className="md:w-1/2 bg-gradient-to-b from-yellow-100 to-yellow-200 flex flex-col items-center justify-center p-6">
        <h1 className="font-bold text-4xl capitalize mb-4 text-gray-800">
          {pokemonDetails.name}
        </h1>
        <img
          src={pokemonDetails.sprites.front_default}
          alt={pokemonDetails.name}
          className="h-6/7 mb-4"
        />
        <div className="flex flex-wrap justify-center gap-2">
          {pokemonDetails.types.map((type, index) => (
            <span
              key={index}
              className={`${type.type.name} m-3 p-2 rounded-2xl text-white font-bold `}
            >
              {type.type.name}
              
            </span>
          ))}
        </div>
      </div>

      <div className="md:w-1/2 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Détails</h2>
        <div className="mb-4 space-y-2">
          <p>
            <strong>Taille :</strong> {pokemonDetails.height / 10} m
          </p>
          <p>
            <strong>Poids :</strong> {pokemonDetails.weight / 10} kg
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
          Statistiques
        </h3>
        <div className="space-y-1">
          {pokemonDetails.stats.map((stat, index) => (
            <div key={index} className="flex justify-between">
              <span className="capitalize">{stat.stat.name}</span>
              <span className="font-medium">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 p-6 bg-yellow-100 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Évolution</h2>
        <div className="space-y-3 flex flex-col items-center">
            {evolutionChain.map((name, index) => (
            <div key={index} className="flex items-center gap-4">
                <img
                src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
                alt={name}
                className="w-16 h-16"
                />
                <span className="capitalize font-medium">{name}</span>
            </div>
            ))}
        </div>
        </div>
    </div>
  );
}

export default Details;
