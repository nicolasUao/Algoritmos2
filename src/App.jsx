
import { useState } from "react";
import { menuData } from "./menuData";
import "./index.css";

function Inicio() {
    return <h2>Bienvenido al panel de administración</h2>;
}

function Productos() {
    return <h2>Administración de productos</h2>;
}

function Baterias() {
    return <h2>Catálogo de baterías</h2>;
}

function Accesorios() {
    return <h2>Catálogo de accesorios</h2>;
}

function Servicios() {
    return <h2>Administración de servicios</h2>;
}

function Instalacion() {
    return <h2>Servicio de instalación</h2>;
}

function Diagnostico() {
    return <h2>Servicio de diagnóstico</h2>;
}

const components = {
    Inicio,
    Productos,
    Baterias,
    Accesorios,
    Servicios,
    Instalacion,
    Diagnostico
};

function MenuItem({ item, onNavigate, activeLink }) {
    const [expanded, setExpanded] = useState(false);

    const hasChildren = item.children.length > 0;

    return (
        <li className="menu-item">
            <div className="menu-row">
                <a
                    href={item.link}
                    className={
                        activeLink === item.link ? "active" : ""
                    }
                    onClick={event => {
                        event.preventDefault();
                        onNavigate(item);
                    }}
                >
                    {item.title}
                </a>

                {hasChildren && (
                    <button
                        className="expand-button"
                        onClick={() => setExpanded(!expanded)}
                        aria-expanded={expanded}
                        aria-label={
                            expanded
                                ? `Cerrar ${item.title}`
                                : `Abrir ${item.title}`
                        }
                    >
                        {expanded ? "−" : "+"}
                    </button>
                )}
            </div>

            {hasChildren && expanded && (
                <ul className="submenu">
                    {item.children.map(child => (
                        <MenuItem
                            key={child.link}
                            item={child}
                            onNavigate={onNavigate}
                            activeLink={activeLink}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

function App() {
    const [activeItem, setActiveItem] = useState(menuData[0]);

    function handleNavigate(item) {
        setActiveItem(item);
    }

    const ActiveComponent = components[activeItem.component];

    return (
        <div className="layout">
            <aside className="sidebar">
                <h2>Mi sistema</h2>

                <ul className="menu">
                    {menuData.map(item => (
                        <MenuItem
                            key={item.link}
                            item={item}
                            onNavigate={handleNavigate}
                            activeLink={activeItem.link}
                        />
                    ))}
                </ul>
            </aside>

            <main className="content">
                <p className="breadcrumb">
                    Página actual: {activeItem.title}
                </p>

                <ActiveComponent />

                <p>
                    Enlace seleccionado: {activeItem.link}
                </p>
            </main>
        </div>
    );
}

export default App;
