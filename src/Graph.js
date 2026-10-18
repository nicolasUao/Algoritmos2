
class Graph {
    constructor() {
        this.nodes = [];
        this.adjacencyList = {};
    }

    addNode(node) {
        if (this.adjacencyList[node.id]) {
            return false;
        }

        this.nodes.push(node);
        this.adjacencyList[node.id] = [];
        return true;
    }

    addEdge(from, to) {
        if (
            !this.adjacencyList[from] ||
            !this.adjacencyList[to]
        ) {
            return false;
        }

        if (!this.adjacencyList[from].includes(to)) {
            this.adjacencyList[from].push(to);
        }

        return true;
    }

    getPeopleByCity(cityId) {
        return this.nodes.filter(
            (node) =>
                node.type === "persona" &&
                this.adjacencyList[node.id]?.includes(cityId)
        );
    }

    getNodes() {
        return this.nodes;
    }

    getAdjacencyList() {
        return this.adjacencyList;
    }
}

export default Graph;
