import {TraverseType, TreeNode} from "./BinaryTreeInterfaces"
import {BinaryTreeClass} from "./BinaryTree";

describe("Binary Tree", () => {

    const tree = new BinaryTreeClass({
        value: 20,
        left: {
            value: 15,
            left: { value: 13 },
            right: { value: 18 }
        },
        right: {
            value: 25,
            right: { value: 30 }
        }
    });

    describe("Traversals", () => {
        it("Inorder", () => {
            expect(tree.traverse(TraverseType.Inorder)).toEqual([13, 15, 18, 20, 25, 30]);
        });
        it("Postorder", () => {
            expect(tree.traverse(TraverseType.Postorder)).toEqual([13, 18, 15, 30, 25, 20]);
        });
        it("Preorder", () => {
            expect(tree.traverse(TraverseType.Preorder)).toEqual([20, 15, 13, 18, 25, 30]);
        });
        it("Breadth", () => {
            expect(tree.traverse(TraverseType.Breadth)).toEqual([20, 15, 25, 13, 18, 30]);
        });
    });

    describe("Get column", () => {
        it("Get column 0", () => {
            expect(tree.getColumn(0)).toEqual([20, 18]);
        });
        it("Get column 1", () => {
            expect(tree.getColumn(1)).toEqual([25]);
        });
        it("Get column -1", () => {
            expect(tree.getColumn(-1)).toEqual([15]);
        });
        it("Get column 2", () => {
            expect(tree.getColumn(2)).toEqual([30]);
        });
        it("Get column -2", () => {
            expect(tree.getColumn(-2)).toEqual([13]);
        });
        it("Get column out of range", () => {
            expect(tree.getColumn(3)).toEqual([]);
        });
    });

    describe("Check setTree", () =>{
        const singleValueTree = new BinaryTreeClass( {
            value: 100
        });

        const tree2:TreeNode<number> = {
            value: 1,
            left: {value: -1},
            right: {value: 2}
        };

        singleValueTree.setTree(tree2);
        it("setTree tree to temp tree2", () => {
            expect(singleValueTree.traverse(TraverseType.Breadth)).toEqual([1, -1 ,2])
        });
    });
});