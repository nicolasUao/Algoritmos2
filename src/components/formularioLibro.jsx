import { useState } from "react"

const campos_vacios = {nombre: "", isbn: "", autor: "", editorial: ""};

function FormularioLibro({onAgregar}) {
    const [datos, setDatos] = useState(campos_vacios)

    function manejarCambio(evento) {
        const {name, value} = evento.target;
        setDatos({...datos, [name]: value});
    }

    function manejaEnvio(evento) {
        evento.preventDefault();

        if (!datos.nombre || !datos.isbn || !datos.autor || !datos.editorial) {
            alert("Completa todos los campos");
            return;
        }

        onAgregar(datos);
        setDatos(campos_vacios);
    }
    
    return (
    <form className="formulario" onSubmit={manejaEnvio}>
      <h2>Agregar libro</h2>

      <label>
        Nombre
        <input name="nombre" value={datos.nombre} onChange={manejarCambio} />
      </label>

      <label>
        ISBN
        <input name="isbn" value={datos.isbn} onChange={manejarCambio} />
      </label>

      <label>
        Autor
        <input name="autor" value={datos.autor} onChange={manejarCambio} />
      </label>

      <label>
        Editorial
        <input name="editorial" value={datos.editorial} onChange={manejarCambio} />
      </label>

      <button type="submit">Apilar libro</button>
    </form>
  );
}

export default FormularioLibro;  

