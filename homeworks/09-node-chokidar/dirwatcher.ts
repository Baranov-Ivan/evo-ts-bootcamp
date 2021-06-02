import fs from "fs";
import crypto from "crypto";

import {EventEmitter} from "events";

export class DirWatcher extends EventEmitter{
    private readonly path: string;
    private readonly delay: number;
    private currentState: Record<string, string> = {};
    private total: string[] = [];

    getPath() {
        return this.path;
    }

    constructor(path: string,delay: number) {
        super();
        this.path = path;
        this.delay = delay;
    }

    watch() {
        setInterval(() => {
            this.total = [];
            fs.readdir(this.path, async (err: Error | null, files: string[]) => {
               //await this.recalculateChecksums(files);

               const currentFiles = Object.keys(this.currentState)
               const diff = files.filter(x => !currentFiles.includes(x));
               const diffCurrent = currentFiles.filter(x => !files.includes(x));

               if(diffCurrent.length) {
                   diffCurrent.forEach(file => {
                       if(diffCurrent.length !== diff.length) {
                           delete this.currentState[file];
                           this.emit("deleted", file);
                       } else {
                           this.emit("renamed", file, diff[0]);
                           this.currentState[diff.pop() as string] = this.currentState[file];
                           delete this.currentState[file];
                       }
                   })
               }

               if(diff.length) {
                   diff.forEach(elem => {
                       this.getChecksum("./"+this.path+"/"+elem).then(res => {
                           this.currentState[elem] = res;
                       })
                   })
               }

               await this.recalculateChecksums(files);

               this.total = [...this.total, ...diff];
               if(this.total.length) {
                   this.emit("changed", this.total);
               }
            });
        },this.delay);
    }

    private async recalculateChecksums(files: string[]): Promise<void> {
        for (const file of files) {
            const checksum = await this.getChecksum("./" + this.path + "/" + file).then(res => {
                return res;
            });
            if (checksum !== this.currentState[file]) {
                await this.putInTotal(file);
                this.currentState[file] = checksum;
            }
        }
    }

    private putInTotal(item: string):void {
        this.total.push(item);
    }

    private getChecksum(path: string): Promise<any> {
        return new Promise(function (resolve, reject) {
            // crypto.createHash('sha1');
            // crypto.createHash('sha256');
            const hash = crypto.createHash('md5');
            const input = fs.createReadStream(path);

            input.on('error', reject);

            input.on('data', function (chunk) {
                hash.update(chunk);
            });

            input.on('close', function () {
                resolve(hash.digest('hex'));
            });
        });
    }
}
