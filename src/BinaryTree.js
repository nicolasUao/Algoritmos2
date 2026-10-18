class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            return true;
        }

        let current = this.root;

        while (true) {
            if (value === current.value) {
                return false;
            }

            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return true;
                }

                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return true;
                }

                current = current.right;
            }
        }
    }

    search(value) {
        let current = this.root;

        while (current !== null) {
            if (current.value === value) {
                return true;
            }

            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    preOrder(node = this.root, result = []) {
        if (node === null) return result;

        result.push(node.value);
        this.preOrder(node.left, result);
        this.preOrder(node.right, result);

        return result;
    }

    inOrder(node = this.root, result = []) {
        if (node === null) return result;

        this.inOrder(node.left, result);
        result.push(node.value);
        this.inOrder(node.right, result);

        return result;
    }

    postOrder(node = this.root, result = []) {
        if (node === null) return result;

        this.postOrder(node.left, result);
        this.postOrder(node.right, result);
        result.push(node.value);

        return result;
    }

    toD3Tree(node = this.root) {
        if (node === null) return null;

        const children = [];

        if (node.left !== null) {
            children.push(this.toD3Tree(node.left));
        }

        if (node.right !== null) {
            children.push(this.toD3Tree(node.right));
        }

        return {
            name: String(node.value),
            children
        };
    }
}