import { useMemo } from "react";
import Header from "../header_footer/Header.jsx";
import Footer from "../header_footer/Footer.jsx";
import ListCard from "../../components/ListCard.jsx";
import Spinner from "../../components/Spinner.jsx";
import usePokemonList from "../../hooks/usePokemonList.jsx";
import useSearch from "../../hooks/useSearch.jsx";

export default function Home() {
    const { search, setSearch } = useSearch();
    const { pokemonList, page, setPage, isLoading, isSearchLoading, error } = usePokemonList(search);

    const filteredPokemon = useMemo(() => pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.trim().toLowerCase())
    ), [pokemonList, search]);

    if (isLoading || (search.trim() && isSearchLoading)) return <Spinner />;

    return (
        <div className="app-shell">
            <Header />
            <main className="main-content">
                <section className="hero-section">
                    <div className="hero-copy">
                        <p className="eyebrow">Field guide · Kanto to beyond</p>
                        <h1>Know them<br /><span>all.</span></h1>
                        <p className="hero-description">Browse the world of Pokemon, one curious discovery at a time.</p>
                    </div>
                    <div className="hero-mark" aria-hidden="true">P</div>
                </section>

                <section className="collection-section">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">The collection</p>
                            <h2>Pokemon index</h2>
                        </div>
                        <span className="page-count">{search.trim() ? "All Pokemon" : `Page ${page}`}</span>
                    </div>

                    <label className="search-field">
                        <span className="search-icon" aria-hidden="true">⌕</span>
                        <span className="sr-only">Search Pokemon</span>
                        <input
                            type="search"
                            name="search"
                            placeholder="Search by name..."
                            onChange={(event) => setSearch(event.target.value)}
                            value={search}
                        />
                        {search && <button type="button" className="clear-search" onClick={() => setSearch("")} aria-label="Clear search">×</button>}
                    </label>

                    {error ? (
                        <p className="message-panel">We could not load the collection. Please try again.</p>
                    ) : (
                        <ListCard pokemons={filteredPokemon} />
                    )}

                    {!error && filteredPokemon.length === 0 && (
                        <p className="message-panel">No Pokemon match “{search}”.</p>
                    )}

                    {!search.trim() && <nav className="pagination" aria-label="Pokemon pages">
                        <button type="button" className="page-button" disabled={page === 1} onClick={() => setPage(page - 1)}>
                            <span aria-hidden="true">←</span> Previous
                        </button>
                        <span className="page-number">{String(page).padStart(2, "0")}</span>
                        <button type="button" className="page-button page-button-next" onClick={() => setPage(page + 1)}>
                            Next <span aria-hidden="true">→</span>
                        </button>
                    </nav>}
                </section>
            </main>
            <Footer />
        </div>
    )
}
