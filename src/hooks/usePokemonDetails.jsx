import { useEffect, useState } from "react";
import { useParams } from "react-router";

const pokemonCache = {};

export default function usePokemonDetails() {
    const { id } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setPokemonDetails(null);
        if (pokemonCache[id]) {
            setPokemonDetails(pokemonCache[id]);
            setIsLoading(false);
            return;
        }
        const fetchPokemonDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                if (!response.ok) throw new Error("Unable to load Pokemon");
                const data = await response.json();
                pokemonCache[id] = data;
                setPokemonDetails(data);
            } catch (error) {
                console.error('Erreur:', error);
            }finally {
                setIsLoading(false);
            }
        }
        fetchPokemonDetails();
    }, [id]);

    return { pokemonDetails, isLoading };
}
