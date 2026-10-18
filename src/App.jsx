import { useState } from "react";
import { Graph as GraphView } from "react-d3-graph";
import Graph from "./Graph";
import "./index.css";

const initialGraph = new Graph();

const initialCities = [
  { id: "ciudad-cali", name: "Cali", type: "ciudad" },
  { id: "ciudad-bogota", name: "Bogotá", type: "ciudad" },
];

initialCities.forEach((city) => initialGraph.addNode(city));

const initialPeople = [
  { id: "persona-laura", name: "Laura", age: 21, type: "persona" },
  { id: "persona-carlos", name: "Carlos", age: 24, type: "persona" },
  { id: "persona-ana", name: "Ana", age: 20, type: "persona" },
];

initialPeople.forEach((person) => {
  initialGraph.addNode(person);
});

initialGraph.addEdge("persona-laura", "ciudad-cali");
initialGraph.addEdge("persona-carlos", "ciudad-bogota");
initialGraph.addEdge("persona-ana", "ciudad-cali");

const config = {
  directed: true,
  height: 550,
  width: 850,
  automaticRearrangeAfterDropNode: true,
  staticGraph: false,
  nodeHighlightBehavior: true,

  d3: {
    alphaTarget: 0.05,
    gravity: -300,
    linkLength: 180,
    disableLinkForce: false,
    fontSize: 14,
  },

  node: {
    color: "#2563eb",
    size: 450,
    fontSize: 14,
    highlightFontSize: 16,
    labelProperty: "label",
  },

  link: {
    color: "#94a3b8",
    renderLabel: false,
    highlightColor: "#2563eb",
  },
};

function App() {
  const [graph, setGraph] = useState(initialGraph);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [ciudadPersona, setCiudadPersona] = useState("ciudad-cali");
  const [nuevaCiudad, setNuevaCiudad] = useState("");
  const [ciudadBuscada, setCiudadBuscada] = useState("ciudad-cali");
  const [mensaje, setMensaje] = useState("");

  const nodes = graph.getNodes();

  const cities = nodes.filter((node) => node.type === "ciudad");

  const people = nodes.filter((node) => node.type === "persona");

  const peopleInCity = graph.getPeopleByCity(ciudadBuscada);

  const graphData = {
    nodes: nodes.map((node) => ({
      id: node.id,
      label:
        node.type === "ciudad"
          ? `Ciudad: ${node.name}`
          : `${node.name} (${node.age} años)`,
      color: node.type === "ciudad" ? "#16a34a" : "#2563eb",
      size: node.type === "ciudad" ? 600 : 450,
    })),
    links: nodes.flatMap((node) =>
      (graph.getAdjacencyList()[node.id] || []).map((target) => ({
        source: node.id,
        target,
      })),
    ),
  };

  function addCity(event) {
    event.preventDefault();

    const name = nuevaCiudad.trim();

    if (!name) {
      setMensaje("Escribe el nombre de la ciudad.");
      return;
    }

    if (cities.some((city) => city.name.toLowerCase() === name.toLowerCase())) {
      setMensaje("Esa ciudad ya existe.");
      return;
    }

    const updatedGraph = new Graph();

    nodes.forEach((node) => updatedGraph.addNode(node));

    Object.entries(graph.getAdjacencyList()).forEach(([from, targets]) => {
      targets.forEach((to) => updatedGraph.addEdge(from, to));
    });

    const id = `ciudad-${Date.now()}`;

    updatedGraph.addNode({
      id,
      name,
      type: "ciudad",
    });

    setGraph(updatedGraph);
    setNuevaCiudad("");
    setCiudadPersona(id);
    setCiudadBuscada(id);
    setMensaje("Ciudad agregada correctamente.");
  }

  function addPerson(event) {
    event.preventDefault();

    if (!nombre.trim() || edad === "") {
      setMensaje("Completa el nombre y la edad.");
      return;
    }

    if (Number(edad) < 0 || !Number.isInteger(Number(edad))) {
      setMensaje("Ingresa una edad válida.");
      return;
    }

    const updatedGraph = new Graph();

    nodes.forEach((node) => updatedGraph.addNode(node));

    Object.entries(graph.getAdjacencyList()).forEach(([from, targets]) => {
      targets.forEach((to) => updatedGraph.addEdge(from, to));
    });

    const id = `persona-${Date.now()}`;

    updatedGraph.addNode({
      id,
      name: nombre.trim(),
      age: Number(edad),
      type: "persona",
    });

    updatedGraph.addEdge(id, ciudadPersona);

    setGraph(updatedGraph);
    setNombre("");
    setEdad("");
    setMensaje("Persona agregada correctamente.");
  }

  return (
    <main className="container">
      <h1>Grafo de personas y ciudades</h1>
      <p>Cada persona se conecta con la ciudad donde vive.</p>

      <section className="forms">
        <form onSubmit={addCity} className="panel">
          <h2>Agregar ciudad</h2>

          <input
            value={nuevaCiudad}
            onChange={(event) => setNuevaCiudad(event.target.value)}
            placeholder="Nombre de la ciudad"
          />

          <button type="submit">Agregar ciudad</button>
        </form>

        <form onSubmit={addPerson} className="panel">
          <h2>Agregar persona</h2>

          <input
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            placeholder="Nombre"
          />

          <input
            type="number"
            min="0"
            step="1"
            value={edad}
            onChange={(event) => setEdad(event.target.value)}
            placeholder="Edad"
          />

          <select
            value={ciudadPersona}
            onChange={(event) => setCiudadPersona(event.target.value)}
          >
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          <button type="submit">Agregar persona</button>
        </form>
      </section>

      {mensaje && <p className="message">{mensaje}</p>}

      <section className="panel">
        <h2>Personas por ciudad</h2>

        <select
          value={ciudadBuscada}
          onChange={(event) => setCiudadBuscada(event.target.value)}
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        {peopleInCity.length > 0 ? (
          <ul>
            {peopleInCity.map((person) => (
              <li key={person.id}>
                {person.name} — {person.age} años
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay personas registradas en esta ciudad.</p>
        )}
      </section>

      <section className="panel">
        <h2>Visualización del grafo</h2>
        <p>
          <span className="legend blue" /> Personas
          {"  "}
          <span className="legend green" /> Ciudades
        </p>

        <div className="graph-container">
          <GraphView
            id="friends-cities-graph"
            data={graphData}
            config={config}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
