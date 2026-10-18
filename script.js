class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value){
        const newNode = new Node(value);

        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.length ++;
            return;
        }

        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;

         this.length ++;
    }

    peek(value, current = this.head){
        while (current) {
            if(current.value === value){
                return current;
            }

            current = current.next;
        }

        return null;
    }

    size() {
        return this.length;
    }

    remove (value) {
        if(!this.head) return null

        let current = this.head;

        while (current) {
            if (current.value === value) {
                if (current === this.head) {
                    this.head = current.next;
                    if (this.head) this.head.prev = null;
                }

                if(current === this.tail) {
                    this.tail = current.prev;
                    if (this.tail) this.tail.next = null;
                }

                if (current.prev) current.prev.next = current.next;
                if (current.next) current.next.prev = current.prev;

                this.length--;
                return current;
            }
            current = current.next;
        }

        return null;
    }

    print() {
        let current = this.head;
        let result = "";
        while (current) {
            result += current.value + "->";
            current = current.next;
        }
        console.log(result + "null");
        
    }


}

const canciones = new LinkedList();
canciones.append("Blinding Lights");
canciones.append("Shape of You");
canciones.append("Believer");
canciones.append("As It Was");
canciones.print();

let cancionActual = canciones.head;

function siguienteCancion() {

    if (cancionActual.next) {
        cancionActual = cancionActual.next;
        document.getElementById("cancionActual").innerText = cancionActual.value;
    }
}


class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

     append(value){
        const newNode = new Node(value);

        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.length ++;
            return;
        }

        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;

         this.length ++;
    }

    print() {
        let current = this.head;
        let result = "";
        while (current) {
            result += current.value + "->";
            current = current.next;
        }
        console.log(result + "null");
        
    }
}

const historial = new DoublyLinkedList();
historial.append("Inicio");
historial.append("Perfil");
historial.append("Configuración");
historial.append("Ayuda");
historial.print();

let paginaActual = historial.head;

function paginaSiguiente() {
    if (paginaActual.next) {
        paginaActual = paginaActual.next;
        document.getElementById("paginaActual").innerText = paginaActual.value;
    }
        
}

function paginaAnterior() {
    if (paginaActual.prev) {
        paginaActual = paginaActual.prev;
        document.getElementById("paginaActual").innerText = paginaActual.value;
    }
}

