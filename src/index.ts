import * as fs from 'fs';
import * as readline from 'readline';
import * as commandLineArgs from 'command-line-args';

const options = commandLineArgs([
    { name: 'out', alias: 'o', type: directory => ({ directory, exists: fs.existsSync(directory) }), defaultOption: true },
]);

const SUPPORTED_LANGUAGES = 'ts|py';

let input = '';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

rl.on("line", (line: string) => {
    input += `${line}\n`;
})

rl.on('close', () => {
    const re = new RegExp(`^\`\`\`(${SUPPORTED_LANGUAGES})\n(.*?)\n\`\`\`\n$`, 'gims');
    let counter = 0;
    for (let match = re.exec(input); match; match = re.exec(input)) {
        fs.writeFileSync(
            `${options.out.directory}/${counter}.${match[1]}`,
            match[2]
        );
        console.log(`created ${counter}.${match[1]}`);
        counter++;
    }
});
