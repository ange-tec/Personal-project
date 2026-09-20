import { useEffect, useState } from "react";

export default function usePokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);

    // Système de Pagination
    const limit = 20;
    const offset = (page - 1) * limit;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    // Système de récupération des données
    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                setIsLoading(true);
                setError(false);
                const response = await fetch(url);
                if (!response.ok) throw new Error("Unable to load Pokemon");
                const data = await response.json();
                setPokemonList(data.results);
            } catch (error) {
                console.error('Erreur:', error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPokemonList();
    }, [url]);

    return { pokemonList, setPokemonList, page, setPage, isLoading, error };
}
