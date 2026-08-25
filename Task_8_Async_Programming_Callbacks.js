/**
 * Task 8: Command-Line Task Logger — Asynchronous Programming & Callback Functions
 * 
 * Requirement:
 * 1. Write saveTaskCallback(task, callback) using fs.appendFile with error-first callback pattern.
 * 2. Call saveTaskCallback and log success or failure message inside the callback.
 */

const fs = require('fs');

/**
 * Appends a task to tasks.txt using error-first callback pattern
 * @param {string} task - Task description to append
 * @param {function(Error|null, string|null): void} callback - Error-first callback (err, resultMsg)
 */
function saveTaskCallback(task, callback) {
    const timestamp = new Date().toLocaleString();
    const entry = `[${timestamp}] ${task}\n`;
    
    // Using fs.appendFile with error-first callback pattern (err, data)
    fs.appendFile('tasks.txt', entry, 'utf8', (err) => {
        if (err) {
            // Pass error to callback as 1st argument
            return callback(err, null);
        }
        // Pass null for error and success message as 2nd argument
        callback(null, `Task "${task}" appended successfully!`);
    });
}

// Call saveTaskCallback and log outcome inside the callback
console.log("Calling saveTaskCallback...");

saveTaskCallback("Task 8: Learn Callback Patterns", (err, result) => {
    if (err) {
        console.error("Callback Error Handler: Failed to save task ->", err.message);
    } else {
        console.log("Callback Success Handler:", result);
    }
});
