import {BinaryTree, TreeNode, TraverseType} from "./BinaryTreeInterfaces"
import {BinaryTreeClass} from "./BinaryTree";

export class BinarySearchTree extends BinaryTreeClass<number> implements BinarySearchTree {
    has(value: number) {

        function traversalSearch(currentNode: TreeNode<number>): boolean {
            if(currentNode.value === value) {
                return true;
            }
            if(currentNode.value > value) {
                if(currentNode.left !== undefined) {
                    return traversalSearch(currentNode.left);
                }
            }
            if(currentNode.value < value) {
                if(currentNode.right !== undefined) {
                    return traversalSearch(currentNode.right);
                }
            }
            return false;
        }

        return traversalSearch(this.tree)
    }
}