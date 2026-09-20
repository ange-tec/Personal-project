import { useEffect, useState } from "react";

export default function usePokemonList(search = "") {
    const [pokemonList, setPokemonList] = useState([]);
    const [allPokemon, setAllPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearchLoading, setIsSearchLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchError, setSearchError] = useState(false);
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

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
                if (!response.ok) throw new Error("Unable to load the full Pokemon index");
                const data = await response.json();
                setAllPokemon(data.results);
            } catch (error) {
                console.error('Erreur:', error);
                setSearchError(true);
            } finally {
                setIsSearchLoading(false);
            }
        };
        fetchAllPokemon();
    }, []);

    return {
        pokemonList: search.trim() ? allPokemon : pokemonList,
        page,
        setPage,
        isLoading,
        isSearchLoading,
        error: search.trim() ? searchError : error,
    };
}
