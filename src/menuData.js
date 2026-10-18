
export const menuData = [
    {
        title: "Inicio",
        link: "/inicio",
        component: "Inicio",
        children: []
    },
    {
        title: "Productos",
        link: "/productos",
        component: "Productos",
        children: [
            {
                title: "Baterías",
                link: "/productos/baterias",
                component: "Baterias",
                children: []
            },
            {
                title: "Accesorios",
                link: "/productos/accesorios",
                component: "Accesorios",
                children: []
            }
        ]
    },
    {
        title: "Servicios",
        link: "/servicios",
        component: "Servicios",
        children: [
            {
                title: "Instalación",
                link: "/servicios/instalacion",
                component: "Instalacion",
                children: []
            },
            {
                title: "Diagnóstico",
                link: "/servicios/diagnostico",
                component: "Diagnostico",
                children: []
            }
        ]
    }
];
