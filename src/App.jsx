
import { useState } from "react";
import Trie from "./Trie";
import MaxHeap from "./MaxHeap";
import "./App.css";

const trie = new Trie();

const products = [
    { name: "Air Max", popularity: 90 },
    { name: "Air Force", popularity: 95 },
    { name: "Air Jordan", popularity: 85 },
    { name: "Adidas Boost", popularity: 80 },
    { name: "Adidas Superstar", popularity: 88 },
    { name: "Nike Dunk", popularity: 92 },
    { name: "Nike Blazer", popularity: 75 },
    { name: "Puma Suede", popularity: 70 },
];

products.forEach((product) => {
    trie.insert(product.name, product.popularity);
});

function searchTopK(prefix, k) {
    const matchingProducts = trie.searchByPrefix(prefix);
    const heap = new MaxHeap();

    matchingProducts.forEach((product) => {
        heap.push(product);
    });

    const results = [];

    while (results.length < k && !heap.isEmpty()) {
        results.push(heap.pop());
    }

    return results;
}

function App() {
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(3);
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    function handleSearch(event) {
        event.preventDefault();

        const foundProducts = searchTopK(search, Number(limit));

        setResults(foundProducts);
        setSearched(true);
    }

    return (
        <main className="container">
            <h1>Busqueda de productos por popularidad</h1>
            <p className="subtitle">
                Encuentra productos por nombre y popularidad.
            </p>

            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Ejemplo: air, nike, adidas..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />

                <select
                    value={limit}
                    onChange={(event) => setLimit(event.target.value)}
                >
                    <option value={1}>Top 1</option>
                    <option value={2}>Top 2</option>
                    <option value={3}>Top 3</option>
                    <option value={5}>Top 5</option>
                </select>

                <button type="submit">Buscar</button>
            </form>

            <section className="results">
                <h2>Resultados</h2>

                {!searched && (
                    <p>Escribe un prefijo para buscar productos.</p>
                )}

                {searched && results.length === 0 && (
                    <p>No se encontraron productos con ese prefijo.</p>
                )}

                {results.map((product, index) => (
                    <article
                        className="product"
                        key={product.name}
                    >
                        <span className="position">
                            #{index + 1}
                        </span>

                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>Popularidad: {product.popularity}</p>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default App;
