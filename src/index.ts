import * as fs from 'fs';
import * as commandLineArgs from 'command-line-args';
import { generate } from './generator'


const options = commandLineArgs([
    { name: 'file', alias: 'f', type: file => ({ name: file, exists: fs.existsSync(file)}), defaultOption: true},
    { name: 'out', alias: 'o', type: directory => ({ name: directory, exists: fs.existsSync(directory) }) },
]);


function main() {
    const { out, file } = options;

    if (!file.exists) {
        console.log(`Couldn't open file ${file.name}`);
        process.exit(1);
    }

    if (out && !out.exists) {
        console.error(`Output directory doesn't exist: ${out.name}`);
        process.exit(1);
    }

    generate(
        fs.readFileSync(file.name).toString(),
        out ? out.name : __dirname
    );
}

main();
