/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (isDirectory) {
            walk(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

function removeComments(content) {
    // 1. Remove JSX comments: {/* comment */}
    content = content.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');

    // 2. Remove multi-line comments: /* comment */
    // Using a safer approach that respects strings
    let result = '';
    let i = 0;
    let inString = null; // ' " `
    let inComment = false;
    let inSingleLineComment = false;

    while (i < content.length) {
        let char = content[i];
        let nextChar = content[i + 1];

        if (!inComment && !inSingleLineComment) {
            if (inString) {
                if (char === inString && content[i - 1] !== '\\') {
                    inString = null;
                }
                result += char;
            } else {
                if (char === '"' || char === "'" || char === "`") {
                    inString = char;
                    result += char;
                } else if (char === '/' && nextChar === '*') {
                    inComment = true;
                    i++;
                } else if (char === '/' && nextChar === '/') {
                    inSingleLineComment = true;
                    i++;
                } else {
                    result += char;
                }
            }
        } else if (inComment) {
            if (char === '*' && nextChar === '/') {
                inComment = false;
                i++;
            }
        } else if (inSingleLineComment) {
            if (char === '\n' || char === '\r') {
                inSingleLineComment = false;
                result += char;
            }
        }
        i++;
    }
    return result;
}

const srcDir = path.join(__dirname, 'src');

walk(srcDir, (filePath) => {
    const ext = path.extname(filePath);
    if (['.ts', '.tsx', '.js', '.jsx', '.css'].includes(ext)) {
        console.log(`Processing: ${filePath}`);
        const content = fs.readFileSync(filePath, 'utf8');
        const cleaned = removeComments(content);
        fs.writeFileSync(filePath, cleaned, 'utf8');
    }
});

console.log('Finished removing comments.');
