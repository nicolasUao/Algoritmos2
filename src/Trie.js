
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
        this.products = [];
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(name, popularity) {
        const normalizedName = name.trim().toLowerCase();

        if (!normalizedName) {
            return;
        }

        let current = this.root;

        for (const character of normalizedName) {
            if (!current.children.has(character)) {
                current.children.set(character, new TrieNode());
            }

            current = current.children.get(character);
        }

        current.isEndOfWord = true;

        current.products = current.products.filter(
            (product) => product.name.toLowerCase() !== normalizedName
        );

        current.products.push({
            name: name.trim(),
            popularity: Number(popularity),
        });
    }

    searchByPrefix(prefix) {
        const normalizedPrefix = prefix.trim().toLowerCase();

        if (!normalizedPrefix) {
            return [];
        }

        let current = this.root;

        for (const character of normalizedPrefix) {
            if (!current.children.has(character)) {
                return [];
            }

            current = current.children.get(character);
        }

        const results = [];

        const collectProducts = (node) => {
            results.push(...node.products);

            for (const child of node.children.values()) {
                collectProducts(child);
            }
        };

        collectProducts(current);

        return results;
    }
}

export default Trie;
