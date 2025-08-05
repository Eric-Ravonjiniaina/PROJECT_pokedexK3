import { useEffect, useState } from "react";
import './css/Card.css';

function Card({pokemonname}) {
    const path = pokemonname?.url;
    
    const [pokemon, setPokemon] = useState({});

    useEffect(()=>{
        if (!path) return;
        fetch(path)
        .then(response => response.json())
        .then(setPokemon)
    },[path])
    return (
        <div className="flex flex-col items-center h-2/3 w-1/4 shadow-xl 
        rounded-3xl bg-white p-5 hover:bg-gray-300 transition-all duration-200">
            <div className="text-start">#{pokemon.id}</div>
            <div className="text-2xl font-bold capitalize">{pokemonname.name}</div>
            <div className="p-5">
                {pokemon.sprites ? (
                    <img src={pokemon.sprites.front_default} alt={pokemonname.name || "pokemon"} />
                    ) : (
                    <div>Image non disponible</div>)}
            </div>
            <div>
                {pokemon.types && pokemon.types.length > 0?
                 pokemon.types.map((type,index)=>
                    <span key={index} className={`${type.type.name} m-3 p-2 rounded-2xl text-white font-bold `}>
                        {type.type.name}
                    </span>
                ): <span>Unkwon</span>}
            </div>
        </div>
    )
}
export default Card