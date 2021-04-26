import {BinarySearchTree} from "./BinarySearchTree"

describe("Binary Search Tree", () => {
    const tree = new BinarySearchTree({
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

    describe("Search elements by 'has' function", () => {
       it("Search for existing max value element", () => {
           expect(tree.has(30)).toBeTruthy();
       });
       it("Search for existing root value element", () => {
           expect(tree.has(20)).toBeTruthy();
       });
       it("Search for existing min value element", () => {
           expect(tree.has(13)).toBeTruthy();
       });
       it("Search for existing intermediate value element", () => {
           expect(tree.has(15)).toBeTruthy();
       });
       it("Search for non-existing large value element", () => {
           expect(tree.has(100)).toEqual(false);
       });
       it("Search for non-existing small value element", () => {
           expect(tree.has(-100)).toEqual(false);
       });
    });
});