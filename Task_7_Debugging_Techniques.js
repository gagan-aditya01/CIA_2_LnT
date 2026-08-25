/**
 * Task 7: Command-Line Task Logger — Debugging Node Programs & Debugging Techniques
 * 
 * Debugging Process & Bug Fix Explanation:
 * ----------------------------------------
 * Intentionally Introduced Bug (Original):
 *   const taskMsg = "Log new task";
 *   console.log(tsakMsg); // Typo: tsakMsg is ReferenceError!
 * 
 * How it was located & diagnosed:
 * 1. Running `node --inspect Task_7_Debugging_Techniques.js` attaches the V8 Inspector to port 9229.
 * 2. Opening `chrome://inspect` in Chrome / DevTools or standard terminal stack trace displays:
 *    "ReferenceError: tsakMsg is not defined at Object.<anonymous>..."
 * 3. The error stack trace explicitly pinpointed the line number and missing identifier.
 * 4. Fix: Corrected `tsakMsg` typo to `taskMsg`.
 */

function logTaskWithDebug(taskName) {
    // Intentionally fixed typo bug: tsakMsg -> taskName
    const taskMsg = `[DEBUGGED] Processing task: ${taskName}`;
    
    // Debugger breakpoint keyword to trigger VS Code / Inspector pause
    debugger;
    
    console.log(taskMsg);
    return taskMsg;
}

console.log("Debugging demonstration started...");
logTaskWithDebug("Fix typo in variable name");
console.log("Debugging demonstration finished successfully.");
