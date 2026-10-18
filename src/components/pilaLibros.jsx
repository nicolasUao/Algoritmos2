function pilaLibros({ pila, onQuitar }) {
  if (pila.length === 0) {
    return <p>La pila está vacía.</p>;
  }

  const desdeElTope = [...pila].reverse();

  return (
    <div className="pila">
      <h2>Pila de libros ({pila.length})</h2>

      <ul>
        {desdeElTope.map((libro, index) => (
          <li key={libro.isbn} className={index === 0 ? "tope" : ""}>
            {index === 0}
            {libro.nombre} — {libro.autor} ({libro.editorial}) [{libro.isbn}]
          </li>
        ))}
      </ul>

      <button onClick={onQuitar} disabled={pila.length === 0}>Quitar libro del tope</button>
    </div>
  );
}

export default pilaLibros;
