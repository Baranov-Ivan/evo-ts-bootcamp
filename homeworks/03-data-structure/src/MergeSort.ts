export interface CompareFunction<T> {
    (a: T, b: T): number;
}

export function mergeSort<T>(array: T[], compareFunction: CompareFunction<T>): T[] {
    let result: T[] = array;
    let len: number = result.length;

    let buffer: T[] = [];

    for (let size = 1; size < len; size *= 2) {
        for (let leftStart = 0; leftStart < len; leftStart += 2 * size) {
            let left: number = leftStart;
            let right: number = Math.min(left + size, len);
            let leftLimit: number = right;
            let rightLimit: number = Math.min(right + size, len);
            let i: number = left;

            while (left < leftLimit && right < rightLimit) {
                if (compareFunction(result[left], result[right]) <= 0) {
                    buffer[i] = result[left];
                    left++;
                    i++;
                } else {
                    buffer[i] = result[right];
                    right++;
                    i++;
                }
            }

            while (left < leftLimit) {
                buffer[i] = result[left];
                left++;
                i++;
            }

            while (right < rightLimit) {
                buffer[i] = result[right];
                right++;
                i++;
            }
        }

        let temp: T[] = result;
        result = buffer;
        buffer = temp;
    }

    return result;
}