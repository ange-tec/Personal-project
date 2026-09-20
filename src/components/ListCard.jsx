import Card from "./Card.jsx";

export default function ListCard({ pokemons }) {
    return (
        <div className="pokemon-grid">
            {pokemons.map((pokemon) => (
                <Card key={pokemon.name} url={pokemon.url} />
            ))}
        </div>
    )
}
