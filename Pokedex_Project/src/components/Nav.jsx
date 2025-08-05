import React, { useState, useEffect } from 'react';

function Nav({onSearchResult}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());}

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
            .then(response => response.json())
            .then(data => setPokemons(data.results));
    }, []);

    useEffect(() => {
            setFilteredPokemons(searchTerm
            ? pokemons.filter(pokemon => pokemon.name.includes(searchTerm))
            : []);
    },[searchTerm])


    useEffect(() => {
        if (filteredPokemons) {
            onSearchResult(filteredPokemons);
            console.log(filteredPokemons);
                        
        }
    }, [filteredPokemons]);

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
            <div className="text-2xl font-bold"> 
                Pokedex
            </div>
            <input type="text" className="bg-white border-none rounded-2xl w-1/4 text-black p-2" onChange={handleSearch} placeholder='Search Pokemon'/>
            <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/about" className="hover:underline">About</a></li>
            </ul>
        </nav>
    );
    
}
export default Nav;