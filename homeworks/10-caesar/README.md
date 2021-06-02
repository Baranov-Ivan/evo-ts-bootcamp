# Caesar task
Completed 10-caesar task with node.js and TypeScript
  
### Install app dependencies

In the CLI (Windows command prompt, PowerShell, Cygwin, terminal, etc.), open the directory containing the app end-run following commands:

```bash
cd caesar-cli
npm install
```

## Usage

To launch the CAESAR-CLI, open the CLI, change the current working directory to the **caesar-cli** folder and run the following command:

```bash
ts-node caesar-cli OPTIONS
```

Feel free to start using CAESAR-CLI with

```bash
ts-node caesar-cli --help
```

When you run any of these commands, you will see detailed help for using the app

```
Usage: ts-node caesar-cli [options]
Options:
      --version   Show version number                             [boolean]
  -s, --shift     Set the shift for decode/encode data            [number] [required]
  -a, --action    Specify what action you want to perform         [required] [choices: "encode", "decode"]
  -i, --input     Specify the file where to get the data from     [string]
  -o, --output    Specify the file to save the data to            [string]
  -h, --help      Show help                                       [boolean]
Examples:
  ts-node caesar-cli --shift=7 --action=encode        Encode data from stdin with shift 7 and print result to stdout
  ts-node caesar-cli -s 2 -a decode -i input.txt  Decode topsecret.txt with shift 2 and print result to stdout
N.B.: 1. If the output file doesn't exist it wouldn't be created. You can write output stream only to the existing file.
      2. If --input option is omitted - STDIN is used as an input source. Use Ctrl+C for break input.
      3. If --output option is omitted - STDOUT is used as an output destination.
      4. --shift value can be negative and can exceed the size of the alphabet.
      5. Only English alphabet characters are encoded/decoded, all other characters will be kept intact.
      6. If --help is given the help is displayed and other options are ignored.
      7. If --version is given and --help has omitted the version of the app is displayed and other options are ignored.
Values for options can be set like "--action encode" (whitespace separated) or "--action=encode" (= separated). It doesn't matter.
```

### Options

CAESAR-CLI accepts these options (short alias and full name):

- **-a, --action**: (_required_) define the action (encode or decode)
- **-s, --shift**: (_required_) define a shift
- **-i, --input**: (_optional_) an input file
- **-o, --output**: (_optional_) an output file  

You can check pull request and add your review there.
  
Evolution TypeScript bootcamp 2021