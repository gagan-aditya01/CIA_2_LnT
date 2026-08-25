/**
 * Task 2: Command-Line Task Logger — Understanding How Node.js Works & Node.js Architecture
 * 
 * V8 Engine & Libuv Architecture Explanation:
 * --------------------------------------------
 * 1. V8 Engine: Developed by Google for Chrome, the V8 engine parses and executes JavaScript code.
 *    It converts JavaScript source code into optimized native machine code.
 * 
 * 2. Libuv: A multi-platform C library that provides Node.js with an event-driven asynchronous I/O model.
 *    It maintains an Event Loop and a Worker Thread Pool for handling non-blocking operations like file system I/O,
 *    networking, and timers.
 * 
 * 3. Interaction:
 *    - JavaScript code is interpreted and executed by the V8 engine on a single main thread.
 *    - When an asynchronous operational call (like fs.readFile) is encountered, V8 offloads the task to Libuv.
 *    - Libuv delegates heavy task execution (e.g. disk read) to its thread pool or OS kernel asynchronously.
 *    - Main thread continues executing subsequent sync V8 instructions without blocking.
 *    - Once Libuv finishes the async operation, it places the callback into the event queue.
 *    - The Event Loop picks up the callback and executes it via V8 once the call stack is empty.
 */

const fs = require('fs');

console.log("Task Logger Started");

// Demonstrating Non-Blocking Behavior
fs.readFile('tasks.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("\n--- [Async Callback] File Contents ---");
    console.log(data);
});

// Immediate log executing synchronously before fs.readFile callback completes
console.log("Immediate Message: Triggered fs.readFile (demonstrating non-blocking asynchronous execution)");
