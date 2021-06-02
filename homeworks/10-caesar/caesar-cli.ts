import {Command} from "commander";
import {Encoder} from "./transformers/encoder";
import {Decoder} from "./transformers/decoder";

import {pipeline} from "stream";
import commander from "commander";

import fs from "fs";
const program = new Command();

program
    .usage("ts-node caesar-cli [options]")

program
    .version("0.0.1", "    --version", "Show version number")
    .requiredOption("-s, --shift <number>", "Set the shift for decode/encode data")
    .requiredOption("-a, --action <encode | decode>", "Specify what action you want to perform")
    .option("-i, --input <string>", "Specify the file where to get the data from")
    .option("-o, --output <string>", "Specify the file to save the data to")

program.addHelpText("after",
   "Examples:\n" +
    "  ts-node caesar-cli --shift=7 --action=encode        Encode data from stdin with shift 7 and print result to stdout\n" +
    "  ts-node caesar-cli -s 2 -a decode -i input.txt  Decode input.txt with shift 2 and print result to stdout\n" +
    "N.B.: 1. If the output file doesn't exist it wouldn't be created. You can write output stream only to the existing file.\n" +
    "      2. If --input option is omitted - STDIN is used as an input source. Use Ctrl+C for break input.\n" +
    "      3. If --output option is omitted - STDOUT is used as an output destination.\n" +
    "      4. --shift value can be negative and can exceed the size of the alphabet.\n" +
    "      5. Only English alphabet characters are encoded/decoded, all other characters will be kept intact.\n" +
    "      6. If --help is given the help is displayed and other options are ignored.\n" +
    "      7. If --version is given and --help has omitted the version of the app is displayed and other options are ignored.\n" +
    "Values for options can be set like \"--action encode\" (whitespace separated) or \"--action=encode\" (= separated). It doesn't matter." );

program.parse(process.argv);

const options = program.opts();

const read = options.input ? fs.createReadStream(options.input) : process.stdin;
const write = options.output ? fs.createWriteStream(options.output) :process.stdout;
const crypto =
    options.action === "encode"
        ? new Encoder({ shift: options.shift })
        : options.action === "decode"
        ? new Decoder({ shift: options.shift })
        : (() => {
            throw new commander.InvalidOptionArgumentError("Wrong action!");
        })();

pipeline(
    read,
    crypto,
    write,
    (err: Error | null) => {
        if (err) {
            console.error("Pipeline failed", err);
        } else {
            console.log("Pipeline succeeded");
        }
    }
);