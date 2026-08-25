/**
 * Task 10: Command-Line Task Logger — JavaScript Promises — Introduction, Detail & Revisited
 * 
 * Requirement:
 * 1. Rewrite saveTaskCallback from Task 8 as a Promise-based function saveTaskPromise(task)
 *    using fs.promises.appendFile.
 * 2. Chain .then() and .catch() to log success or failure when calling saveTaskPromise.
 */

const fs = require('fs').promises;

/**
 * Promise-based function to append a task to tasks.txt
 * @param {string} task - Description of task to append
 * @returns {Promise<string>} Promise resolving to success message
 */
function saveTaskPromise(task) {
    const timestamp = new Date().toLocaleString();
    const entry = `[${timestamp}] ${task}\n`;
    
    // Returns a Promise that resolves when file append completes or rejects on error
    return fs.appendFile('tasks.txt', entry, 'utf8')
        .then(() => {
            return `Task "${task}" saved successfully via Promise!`;
        });
}

// Chaining .then() and .catch()
console.log("Executing saveTaskPromise with .then() and .catch()...");

saveTaskPromise("Task 10: Master JavaScript Promises")
    .then((message) => {
        console.log("Promise Resolved [.then()]:", message);
    })
    .catch((error) => {
        console.error("Promise Rejected [.catch()]:", error.message);
    });
