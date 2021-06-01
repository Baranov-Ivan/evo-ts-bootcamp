import {Transform, TransformCallback} from "stream";

export class Decoder extends Transform {
    private readonly shift: number;

    constructor(options: {shift: string}) {
        super();
        this.shift = parseInt(options.shift)
    }

    _transform(chunk: any, _: BufferEncoding, callback: TransformCallback): void {
        try {
            const str = chunk.toString("utf-8");
            const res = String.fromCharCode(
                ...str.split('').map((char: string) => {
                    const code = char.charCodeAt(0);
                    if(code > 96 && code < 123)
                        return ((code - 122 - this.shift) % 26) + 122;
                    if(code > 64 && code < 91)
                        return ((code - 90 - this.shift) % 26) + 90;
                    return code;
                }),
            );
            callback(null, res);
        } catch (err) {
            callback(err);
        }
    }
}