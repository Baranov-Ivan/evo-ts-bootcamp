export interface TreeNode<T> {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
}

 export enum TraverseType {
    Preorder = "PREORDER",
    Postorder = "POSTORDER",
    Inorder = "INORDER",
    Breadth = "BREADTH"
}

export interface BinaryTree<T> {
    setTree(tree: TreeNode<T>): this;

    traverse(traverseType: TraverseType): T[];

    getColumn(columnOrder: number): T[];
}

export interface BinarySearchTree extends BinaryTree<number> {
   has(value: number): boolean;
}