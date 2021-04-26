import {mergeSort} from "./MergeSort";

describe("Merge sort", () => {
    it("Merge sort array of numbers with repetitions", () => {
       expect(mergeSort([1, 4, 2, 5, 3, 3], (a: number, b: number): number => a - b)).toEqual([1, 2, 3, 3, 4, 5]);
    });
    it("Merge sort array of numbers without repetitions", () => {
        expect(mergeSort([2, 4, 1, 5, 6, 3], (a: number, b: number): number => a - b)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    interface Person {
        name: string;
        age: number;
    }

    const obj1: Person[] = [
        {
            name: "Petr",
            age: 23
        },
        {
            name: "Sergey",
            age: 18
        },
        {
            name: "Anna",
            age: 20
        }
    ];

    const obj2: Person[] = Object.create(obj1);

    function comparePersonsByAge(person1: Person, person2: Person): number {
        return person1.age - person2.age;
    }

    function comparePersonsByName(person1: Person, person2: Person): number {
        return person1.name.localeCompare(person2.name);
    }

    const resultNameArray = mergeSort(obj1,comparePersonsByName);
    it("Merge sort array of object with custom compare function (string)", () => {
        expect(resultNameArray[0].name).toEqual("Anna");
        expect(resultNameArray[2].name).toEqual("Sergey");
    });

     const resultAgeArray = mergeSort(obj2,comparePersonsByAge);
    it("Merge sort array of object with custom compare function (number)", () => {
        expect(resultAgeArray[0].age).toEqual(18);
        expect(resultAgeArray[2].age).toEqual(23);
    });
});