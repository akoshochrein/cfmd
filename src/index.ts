import * as fs from 'fs';
import * as readline from 'readline';

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
            `/Users/prezi/workspace/out/${counter}.${match[1]}`,
            match[2]
        );
        console.log(`created ${counter}.${match[1]}`);
        counter++;
    }
});
