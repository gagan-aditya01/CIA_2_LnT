/**
 * Task 3: Command-Line Task Logger — NodeJS Resources & Working with NodeJS Examples
 * 
 * Official Documentation Reference:
 * Documented API Page: https://nodejs.org/api/fs.html (File system module)
 * 
 * Exact Method Names Used from 'fs' Module:
 * 1. fs.readFile(path[, options], callback) - Asynchronously reads the entire contents of a file.
 * 2. fs.readFileSync(path[, options]) - Synchronous version of readFile.
 * 3. fs.appendFile(path, data[, options], callback) - Asynchronously appends data to a file.
 */

const fs = require('fs');

console.log("Task Logger Started");

// Adapted example from Node.js Official Documentation (fs.readFile)
// Doc Reference: https://nodejs.org/api/fs.html#fsreadfilepath-options-callback
fs.readFile('tasks.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file tasks.txt:", err);
        return;
    }
    console.log("\n--- [Official Doc Example Adaptation] tasks.txt Contents ---");
    console.log(data);
});
