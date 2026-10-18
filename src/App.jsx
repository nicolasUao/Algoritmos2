import { useState } from "react";
import { mockBooks } from "./data/mockNooks";
import FormularioLibro from "./components/formularioLibro";
import PilaLibros from "./components/pilaLibros";
import "./App.css";

function App() {
  const [pila, setPila] = useState(mockBooks);

  //PUSH: agrega un libro al tope de la pila
  function apilarLibro(nuevoLibro) {
    setPila([...pila, nuevoLibro]);
  }

  //POP: quita el libro que está en el tope
  function desapilarLibro() {
    setPila(pila.slice(0, -1));
  }

  return (
    <div className="app">
      <h1>Pila de libros</h1>
      <FormularioLibro onAgregar={apilarLibro} />
      <PilaLibros pila={pila} onQuitar={desapilarLibro} />
    </div>
  )
}

export default App;
