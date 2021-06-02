import csv from "csvtojson";

export interface DataInfo {
    file: string,
    data: object
}

export class Importer {
    import(files: string[],path: string): Promise<DataInfo[]> {
        return Promise.all(files.map(file => {
            return {file: file , data: csv().fromFile("./"+path+"/"+file)};
        }));
    }

}