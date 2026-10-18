
class MaxHeap {
    constructor() {
        this.items = [];
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    swap(indexA, indexB) {
        [this.items[indexA], this.items[indexB]] = [
            this.items[indexB],
            this.items[indexA],
        ];
    }

    push(product) {
        this.items.push(product);
        this.percolateUp(this.items.length - 1);
    }

    percolateUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);

            if (
                this.items[parent].popularity >=
                this.items[index].popularity
            ) {
                break;
            }

            this.swap(parent, index);
            index = parent;
        }
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }

        if (this.items.length === 1) {
            return this.items.pop();
        }

        const maximum = this.items[0];
        this.items[0] = this.items.pop();

        this.percolateDown(0);

        return maximum;
    }

    percolateDown(index) {
        while (true) {
            let largest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (
                left < this.items.length &&
                this.items[left].popularity >
                    this.items[largest].popularity
            ) {
                largest = left;
            }

            if (
                right < this.items.length &&
                this.items[right].popularity >
                    this.items[largest].popularity
            ) {
                largest = right;
            }

            if (largest === index) {
                break;
            }

            this.swap(index, largest);
            index = largest;
        }
    }
}

export default MaxHeap;
