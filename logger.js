/**
 * Main Entry Point: logger.js
 * Comprehensive Command-Line Task Logger combining concepts from Task 1 through Task 11.
 *
 * Node.js Architecture (V8 Engine & Libuv):
 * - V8 Engine: Converts JS code to machine code and executes synchronous code on the single main thread.
 * - Libuv: C++ library providing event loop and thread pool for non-blocking asynchronous I/O.
 */

const fs = require('fs');
const fsPromises = fs.promises;
const readline = require('readline');

console.log("Task Logger Started");

// Utility function for formatted timestamps
function getTimestamp() {
    return new Date().toLocaleString();
}

/**
 * Asynchronously save a task with Promise & Try/Catch
 * @param {string} task 
 * @param {string} filePath 
 */
async function saveTaskAsync(task, filePath = 'tasks.txt') {
    try {
        const entry = `[${getTimestamp()}] ${task}\n`;
        await fsPromises.appendFile(filePath, entry, 'utf8');
        console.log(`[${getTimestamp()}] Success: Task saved to ${filePath}`);
    } catch (err) {
        console.error(`[${getTimestamp()}] Error saving task to ${filePath}:`, err.message);
    }
}

// Interactive CLI execution if arguments provided
const cliTask = process.argv.slice(2).join(' ');

if (cliTask) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`Save task "${cliTask}"? (y/n): `, async (ans) => {
        if (ans.trim().toLowerCase() === 'y') {
            await saveTaskAsync(cliTask);
        } else {
            console.log("Operation cancelled.");
        }
        rl.close();
    });
} else {
    // Demonstration of timers and non-blocking read
    console.log("No CLI task provided. Running default status logger...");
    
    // Non-blocking file read
    fs.readFile('tasks.txt', 'utf8', (err, data) => {
        if (err) return console.error("Error reading tasks.txt:", err.message);
        console.log("\n--- Current Logged Tasks ---");
        console.log(data);
    });

    // 5-second reminder timer
    setTimeout(() => {
        console.log("\nReminder: review your tasks!");
    }, 5000);
}
