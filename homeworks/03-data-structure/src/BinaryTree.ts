import {BinaryTree, TreeNode, TraverseType} from "./BinaryTreeInterfaces"

export class BinaryTreeClass<T> implements BinaryTree<T> {
    constructor(public tree: TreeNode<T>) {}

    setTree(tree: TreeNode<T>): this {
        this.tree = tree;
        return this;
    }

    traverse(traverseType: TraverseType) {
        switch (traverseType) {
            case TraverseType.Preorder:
                return this.internalPreorder(this.tree);
            case TraverseType.Postorder:
                return this.internalPostorder(this.tree);
            case TraverseType.Inorder:
                return this.internalInorder(this.tree);
            case TraverseType.Breadth:
                return this.internalBreadth(this.tree);
        }
    }

    private internalInorder(root?: TreeNode<T>, array: T[] = []): T[] {
        if (root === undefined) {
            return array;
        }

        this.internalInorder(root.left, array);
        array.push(root.value);
        this.internalInorder(root.right, array);
        return array;
    }

    private internalPostorder(root?: TreeNode<T>, array: T[] = []): T[] {
        if (root === undefined) {
            return array;
        }

        this.internalPostorder(root.left, array);
        this.internalPostorder(root.right, array);
        array.push(root.value);
        return array;
    }

    private internalPreorder(root?: TreeNode<T>, array: T[] = []): T[] {
        if (root === undefined) {
            return array;
        }

        array.push(root.value);
        this.internalPreorder(root.left, array);
        this.internalPreorder(root.right, array);
        return array;
    }

    private internalBreadth(root: TreeNode<T>): T[] {
        let visited: T[] = [];
        let queue: TreeNode<T>[] = [];
        let current: TreeNode<T> = root;

        queue.push(current);
        while(queue.length) {
            current = queue.shift() as TreeNode<T>;
            visited.push(current.value);

            if(current.left) {
                queue.push(current.left);
            }

            if(current.right) {
                queue.push(current.right);
            }
        }

        return visited;
    }

    getColumn(columnOrder: number): T[] {
        let visited: T[] = [];
        let queue: {current: TreeNode<T>, currentColumn: number}[] = [];
        let current: TreeNode<T> = this.tree;
        let currentColumn: number = 0;

        queue.push({current, currentColumn});
        while(queue.length) {
            let obj: {current: TreeNode<T>, currentColumn: number} = queue.shift() as {current: TreeNode<T>, currentColumn: number};
            current = obj.current;
            currentColumn = obj.currentColumn;
            if(currentColumn === columnOrder) {
                visited.push(current.value);
            }

            if(current.left) {
                queue.push({current: current.left, currentColumn: currentColumn - 1});
            }

            if(current.right) {
                queue.push({current: current.right, currentColumn: currentColumn + 1});
            }
        }

        return visited;
    }
}