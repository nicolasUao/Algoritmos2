
import { useState } from "react";
import Tree from "react-d3-tree";
import { BinaryTree } from "./BinaryTree";
import "./index.css";

const tree = new BinaryTree();

// numeros test
[50, 30, 70, 20, 40, 60, 80].forEach(number => {
    tree.insert(number);
});

function App() {
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");

    const [treeData, setTreeData] = useState([
        tree.toD3Tree()
    ]);

    const [traversals, setTraversals] = useState(null);

    function handleInsert() {
        if (number.trim() === "") {
            setMessage("Ingresa un número.");
            return;
        }

        const value = Number(number);

        if (!Number.isFinite(value)) {
            setMessage("Ingresa un número válido.");
            return;
        }

        const inserted = tree.insert(value);

        if (!inserted) {
            setMessage("Ese número ya existe.");
            return;
        }

        setTreeData([tree.toD3Tree()]);
        setMessage(`Número ${value} insertado correctamente.`);
        setNumber("");
        setTraversals(null);
    }

    function handleSearch() {
        if (number.trim() === "") {
            setMessage("Ingresa un número para buscar.");
            return;
        }

        const value = Number(number);

        if (!Number.isFinite(value)) {
            setMessage("Ingresa un número válido.");
            return;
        }

        const found = tree.search(value);

        setMessage(
            found
                ? `El número ${value} sí existe en el árbol.`
                : `El número ${value} no existe en el árbol.`
        );
    }

    function handleTraversals() {
        setTraversals({
            preOrder: tree.preOrder(),
            inOrder: tree.inOrder(),
            postOrder: tree.postOrder()
        });
    }

    return (
        <main className="app">
            <h1>Árbol binario de búsqueda</h1>

            <p>
                Inserta números, búscalos y observa la estructura
                del árbol.
            </p>

            <section className="controls">
                <input
                    type="number"
                    value={number}
                    onChange={event => setNumber(event.target.value)}
                    placeholder="Escribe un número"
                />

                <button onClick={handleInsert}>
                    Insertar
                </button>

                <button onClick={handleSearch}>
                    Buscar
                </button>

                <button onClick={handleTraversals}>
                    Mostrar recorridos
                </button>
            </section>

            <p className="message" role="status">{message}</p>

            <section className="tree-container">
                <Tree
                    data={treeData}
                    orientation="vertical"
                    pathFunc="elbow"
                    translate={{ x: 400, y: 70 }}
                    zoomable
                    collapsible={false}
                />
            </section>

            {traversals && (
                <section className="results">
                    <h2>Recorridos del árbol</h2>

                    <p>
                        <strong>PreOrder:</strong>{" "}
                        {traversals.preOrder.join(", ")}
                    </p>

                    <p>
                        <strong>InOrder:</strong>{" "}
                        {traversals.inOrder.join(", ")}
                    </p>

                    <p>
                        <strong>PostOrder:</strong>{" "}
                        {traversals.postOrder.join(", ")}
                    </p>
                </section>
            )}
        </main>
    );
}

export default App;
