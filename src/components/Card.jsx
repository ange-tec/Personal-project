import { useState, useEffect } from "react";
import Button from "./Button.jsx";
import Spinner from "./Spinner.jsx";

export default function Card({ url }) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Unable to load Pokemon");
                const data = await response.json();
                setPokemon(data);
            } catch (error) {
                console.error('Erreur:', error);
            }
        };
        fetchPokemon();
    }, [url]);

    if (!pokemon) return <Spinner />;

    return (
        <article className="pokemon-card">
            <div className="card-topline">
                <span className="pokemon-number">#{String(pokemon.id).padStart(3, "0")}</span>
                <span className="card-arrow" aria-hidden="true">↗</span>
            </div>
            <div className="pokemon-art">
                <img src={pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default} alt={pokemon.name} loading="lazy" />
            </div>
            <div className="card-content">
                <h3>{pokemon.name}</h3>
                <div className="type-list">
                    {pokemon.types.map((item) => <span className={`type-pill type-${item.type.name}`} key={item.type.name}>{item.type.name}</span>)}
                </div>
                <div className="card-stats">
                    <span><strong>{(pokemon.height / 10).toFixed(1)}m</strong> height</span>
                    <span><strong>{(pokemon.weight / 10).toFixed(1)}kg</strong> weight</span>
                </div>
                <Button
                    id={pokemon.id}
                />
            </div>
        </article>

    )
}
