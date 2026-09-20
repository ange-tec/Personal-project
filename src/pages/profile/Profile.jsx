import Spinner from "../../components/Spinner.jsx";
import usePokemonDetails from "../../hooks/usePokemonDetails.jsx";
import { Link } from "react-router-dom";

export default function Profile() {

    const { pokemonDetails, isLoading } = usePokemonDetails();

    if (isLoading) return <Spinner />;

    return (
        <main className="profile-page">
            <Link className="back-link" to="/">← Back to index</Link>
            <article className="profile-card">
                <div className="profile-art">
                    <img src={pokemonDetails.sprites.other?.["official-artwork"]?.front_default || pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
                </div>
                <div className="profile-copy">
                    <p className="eyebrow">Pokemon profile · #{String(pokemonDetails.id).padStart(3, "0")}</p>
                    <h1>{pokemonDetails.name}</h1>
                    <div className="type-list">
                        {pokemonDetails.types.map((item) => <span className={`type-pill type-${item.type.name}`} key={item.type.name}>{item.type.name}</span>)}
                    </div>
                    <div className="profile-stats">
                        <div><strong>{(pokemonDetails.height / 10).toFixed(1)}m</strong><span>Height</span></div>
                        <div><strong>{(pokemonDetails.weight / 10).toFixed(1)}kg</strong><span>Weight</span></div>
                    </div>
                </div>
            </article>
        </main>
    )
}
