/**
 * Task 5: Command-Line Task Logger — Node Process Object, Command Line & Terminal I/O
 * 
 * Demonstrates:
 * 1. process.argv to parse command-line task input
 * 2. process.stdin and process.stdout (readline interface) to prompt for y/n user confirmation
 */

const fs = require('fs');
const readline = require('readline');

// Accept task description from command line arguments
const taskInput = process.argv.slice(2).join(' ');

if (!taskInput) {
    console.log("Usage: node Task_5_Process_CommandLine_IO.js <task_description>");
    console.log("Example: node Task_5_Process_CommandLine_IO.js \"Complete Lab Report\"");
    process.exit(1);
}

console.log(`Received task from CLI: "${taskInput}"`);

// Create readline interface for terminal I/O (using process.stdin & process.stdout)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`Are you sure you want to save this task? (y/n): `, (answer) => {
    const formattedAnswer = answer.trim().toLowerCase();
    
    if (formattedAnswer === 'y' || formattedAnswer === 'yes') {
        const timestamp = new Date().toLocaleString();
        const entry = `[${timestamp}] ${taskInput}\n`;
        
        fs.appendFile('tasks.txt', entry, (err) => {
            if (err) {
                console.error("Failed to save task:", err);
            } else {
                console.log(`Success: Task "${taskInput}" saved successfully to tasks.txt.`);
            }
            rl.close();
        });
    } else {
        console.log("Action cancelled: Task was NOT saved.");
        rl.close();
    }
});
