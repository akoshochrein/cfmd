import * as fs from 'fs';

const SUPPORTED_LANGUAGES = 'ts|py';
const re = new RegExp(`^\`\`\`(${SUPPORTED_LANGUAGES})\n(.*?)\n\`\`\`\n$`, 'gims');

export const generate = (input: string, outputDirectory: string) => {
    let counter = 0;
    for (let match = re.exec(input); match; match = re.exec(input)) {
        const outFileName = `${counter}.${match[1]}`;
        const outputPath = `${outputDirectory}/${outFileName}`;
        fs.writeFileSync(outputPath, match[2]);
        console.log(`created ${counter}.${match[1]}`);
        counter++;
    }
}