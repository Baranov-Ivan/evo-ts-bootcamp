import {DirWatcher} from "./dirwatcher";
import {Importer, DataInfo} from "./importer";

const watcher = new DirWatcher("data",1000);
watcher.watch();
const importer = new Importer();

watcher.on("changed", (files: string[]) => {
   importer.import(files,watcher.getPath()).then(
       (jsonObjs: DataInfo[])=> {
          jsonObjs.forEach(async (obj: DataInfo) => {
             console.log("==== Changed file: ", obj.file," ====\n",
                         await obj.data);
          })
       }
   );
});

watcher.on("deleted", (file: string) => {
    console.log("==== File deleted: ", file," ====");
});

watcher.on("renamed", (prevFile: string, newFile: string ) => {
    console.log("==== File was renamed from: ", prevFile," to: " , newFile, " ====");
})