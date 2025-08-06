import { useEffect, useState } from "react";
import Card from "./Card";

function Page({pokemonsList,isSearchTerm, sendUrl}) {
    const [detailsUrl, setDetailsUrl] = useState("");
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(0);
    
    useEffect(() => {
        if (sendUrl) {
            sendUrl(detailsUrl);
        }
    }, [detailsUrl]);

        useEffect(() => {
            const offset = page * 15;
            window.scrollTo({ top: 0, behavior: "smooth" });
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offset}`)
            .then(response => response.json())
            .then(data => setPokemons(data.results))
        },[page]);
    if (!isSearchTerm) {
        return (
            <div className="flex flex-wrap justify-center gap-10 px-5 py-10">
                {pokemons.map(pokemon =>(
                    <Card key={pokemon.name} pokemonname={pokemon} sendUrl={setDetailsUrl}/>
                ))}
                <div className="flex justify-between w-full mt-5">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => setPage(prev => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="flex flex-wrap justify-center gap-10 px-5 py-10 min-h-screen">
                {pokemonsList  !=null  && pokemonsList.map(pokemon =>(
                    <Card key={pokemon.name} pokemonname={pokemon} sendUrl={setDetailsUrl}/>
                ))}
            </div>
        )
    }
}
export default Page;