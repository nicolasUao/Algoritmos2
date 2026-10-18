function fechaAleatoria() {
    const inicio = new Date(2025, 0, 1);
    const fin = new Date();
    const fecha = new Date(inicio.getTime() + Math.random() * (fin.getTime() - inicio.getTime()));
    return fecha;
}

class Persona {
    constructor(nombre, monto, fechaLlegada) {
        this.nombre = nombre;
        this.monto = monto;
        this.fechaLlegada = fechaLlegada;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    enqueue(nombre, monto, fechaLlegada) {
        const newPersona = new Persona(nombre, monto, fechaLlegada);

        if (!this.head) {
            this.head = newPersona;
            this.tail = newPersona;
            this.length++;
            return;
        }

        this.tail.next = newPersona;
        this.tail = newPersona;

        this.length++;
    }

    dequeue() {
        if (!this.head) {
            return null;
        }

        const personaQueSale = this.head;

        this.head = this.head.next;

        if (!this.head) {
            this.tail = null;
        }

        this.length--;

        return personaQueSale;
    }

    imprimirPorFecha() {
        let personas = [];
        let current = this.head;

        while (current) {
            personas.push(current);
            current = current.next;
        }

        personas.sort((a, b) => a.fechaLlegada - b.fechaLlegada);

        let html = "";

        personas.forEach(persona => {
            const fechaFormateada = persona.fechaLlegada.toLocaleDateString('es-CO', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            html += `<p>${persona.nombre} - $${persona.monto} - ${fechaFormateada}</p>`;
        });

        document.getElementById("colaATM").innerHTML = html;
    }
}

const colaATM = new Queue();

colaATM.enqueue("Juan Pérez", 500000, fechaAleatoria());
colaATM.enqueue("María Gómez", 200000, fechaAleatoria());
colaATM.enqueue("Carlos Ruiz", 1000000, fechaAleatoria());
colaATM.enqueue("Ana Torres", 350000, fechaAleatoria());

colaATM.imprimirPorFecha();

document.getElementById("formPersona").addEventListener("submit", function(evento) {
    evento.preventDefault(); 

    const nombre = document.getElementById("inputNombre").value;
    const monto = document.getElementById("inputMonto").value;

    colaATM.enqueue(nombre, monto, fechaAleatoria());

    colaATM.imprimirPorFecha(); 

    evento.target.reset(); 
});