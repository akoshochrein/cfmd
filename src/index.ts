import * as fs from 'fs';
import * as commandLineArgs from 'command-line-args';

const SUPPORTED_LANGUAGES = 'ts|py';

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

    const input = fs.readFileSync(file.name).toString();
    const re = new RegExp(`^\`\`\`(${SUPPORTED_LANGUAGES})\n(.*?)\n\`\`\`\n$`, 'gims');
    let counter = 0;
    for (let match = re.exec(input); match; match = re.exec(input)) {
        const outFileName = `${counter}.${match[1]}`;
        const outputDir = `${out ? out.name : __dirname}/${outFileName}`;
        fs.writeFileSync(outputDir, match[2]);
        console.log(`created ${counter}.${match[1]}`);
        counter++;
    }
}

main();
