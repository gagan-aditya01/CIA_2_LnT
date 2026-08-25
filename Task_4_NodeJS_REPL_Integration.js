/**
 * Task 4: Command-Line Task Logger — NodeJS REPL Introduction
 * 
 * Snippet tested & verified in Node.js REPL:
 * > const timestamp = new Date().toISOString();
 * > console.log(`[${timestamp}] Task Logger Started`);
 */

const fs = require('fs');

// Move working timestamp snippet from REPL into script
function getFormattedTimestamp() {
    return new Date().toLocaleString();
}

console.log(`[${getFormattedTimestamp()}] Task Logger Started`);

// Log timestamped task reading
fs.readFile('tasks.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(`[${getFormattedTimestamp()}] Error reading tasks:`, err);
        return;
    }
    console.log(`\n[${getFormattedTimestamp()}] Logged Tasks:`);
    const tasks = data.trim().split('\n');
    tasks.forEach((task, index) => {
        console.log(`[${getFormattedTimestamp()}] Task #${index + 1}: ${task}`);
    });
});
