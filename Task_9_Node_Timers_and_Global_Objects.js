/**
 * Task 9: Command-Line Task Logger — Node Timers & Global Objects
 * 
 * Requirement:
 * 1. setTimeout to log "Reminder: review your tasks" 5 seconds after app starts.
 * 2. setInterval to print number of tasks logged so far every 3 seconds,
 *    clearing it with clearInterval after 15 seconds.
 */

let tasksLoggedCount = 0;

console.log(`[${new Date().toLocaleTimeString()}] Task Logger Timer Service Started.`);

// 1. One-shot timer: setTimeout after 5 seconds (5000 ms)
setTimeout(() => {
    console.log(`\n[${new Date().toLocaleTimeString()}] ⏰ Reminder: review your tasks!\n`);
}, 5000);

// 2. Recurring timer: setInterval every 3 seconds (3000 ms)
const intervalId = setInterval(() => {
    tasksLoggedCount += 1;
    console.log(`[${new Date().toLocaleTimeString()}] 📊 Task counter update: ${tasksLoggedCount} task status check(s) completed so far.`);
}, 3000);

// Stop the interval timer after 15 seconds (15000 ms)
setTimeout(() => {
    clearInterval(intervalId);
    console.log(`\n[${new Date().toLocaleTimeString()}] 🛑 Stopped interval timer after 15 seconds.`);
}, 15000);
