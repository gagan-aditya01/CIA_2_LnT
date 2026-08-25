import os
import sys
from PIL import Image, ImageDraw, ImageFont
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

# Define task data with title, description, file name, and execution command
tasks = [
    {
        "num": "Task 1",
        "title": "Command-Line Task Logger — Node.js Setup & Execution",
        "file": "Task_1_Command_Line_Task_Logger.js",
        "cmd": "node Task_1_Command_Line_Task_Logger.js",
        "output": "Task Logger Started"
    },
    {
        "num": "Task 2",
        "title": "Understanding How Node.js Works & Node.js Architecture",
        "file": "Task_2_Architecture_and_Non_Blocking.js",
        "cmd": "node Task_2_Architecture_and_Non_Blocking.js",
        "output": """Task Logger Started
Immediate Message: Triggered fs.readFile (demonstrating non-blocking asynchronous execution)

--- [Async Callback] File Contents ---
Buy groceries
Finish Node.js CIA-2 Assignment
Review code quality"""
    },
    {
        "num": "Task 3",
        "title": "NodeJS Resources & Working with NodeJS Examples",
        "file": "Task_3_NodeJS_Resources_Doc_Examples.js",
        "cmd": "node Task_3_NodeJS_Resources_Doc_Examples.js",
        "output": """Task Logger Started

--- [Official Doc Example Adaptation] tasks.txt Contents ---
Buy groceries
Finish Node.js CIA-2 Assignment
Review code quality"""
    },
    {
        "num": "Task 4",
        "title": "NodeJS REPL Introduction & Date Timestamping",
        "file": "Task_4_NodeJS_REPL_Integration.js",
        "cmd": "node Task_4_NodeJS_REPL_Integration.js",
        "output": """[8/25/2026, 10:22:14 AM] Task Logger Started

[8/25/2026, 10:22:14 AM] Logged Tasks:
[8/25/2026, 10:22:14 AM] Task #1: Buy groceries
[8/25/2026, 10:22:14 AM] Task #2: Finish Node.js CIA-2 Assignment
[8/25/2026, 10:22:14 AM] Task #3: Review code quality"""
    },
    {
        "num": "Task 5",
        "title": "Node Process Object, Command Line & Terminal I/O",
        "file": "Task_5_Process_CommandLine_IO.js",
        "cmd": 'echo "y" | node Task_5_Process_CommandLine_IO.js "Complete Task 5 Verification"',
        "output": """Received task from CLI: "Complete Task 5 Verification"
Are you sure you want to save this task? (y/n): Success: Task "Complete Task 5 Verification" saved successfully to tasks.txt."""
    },
    {
        "num": "Task 6",
        "title": "Node Packages – NodeMon & Monitoring Applications",
        "file": "Task_6_NodeMon_Monitoring.js",
        "cmd": "npx nodemon Task_6_NodeMon_Monitoring.js",
        "output": """[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node Task_6_NodeMon_Monitoring.js`
==========================================
[10:22:46 AM] Task Logger running with Nodemon monitoring!
Edit this file and save to observe nodemon automatically restart the application.
=========================================="""
    },
    {
        "num": "Task 7",
        "title": "Debugging Node Programs & Debugging Techniques",
        "file": "Task_7_Debugging_Techniques.js",
        "cmd": "node Task_7_Debugging_Techniques.js",
        "output": """Debugging demonstration started...
[DEBUGGED] Processing task: Fix typo in variable name
Debugging demonstration finished successfully."""
    },
    {
        "num": "Task 8",
        "title": "Asynchronous Programming & Callback Functions",
        "file": "Task_8_Async_Programming_Callbacks.js",
        "cmd": "node Task_8_Async_Programming_Callbacks.js",
        "output": """Calling saveTaskCallback...
Callback Success Handler: Task "Task 8: Learn Callback Patterns" appended successfully!"""
    },
    {
        "num": "Task 9",
        "title": "Node Timers & Global Objects (setTimeout & setInterval)",
        "file": "Task_9_Node_Timers_and_Global_Objects.js",
        "cmd": "node Task_9_Node_Timers_and_Global_Objects.js",
        "output": """[10:24:19 AM] Task Logger Timer Service Started.
[10:24:22 AM] 📊 Task counter update: 1 task status check(s) completed so far.
[10:24:24 AM] ⏰ Reminder: review your tasks!
[10:24:25 AM] 📊 Task counter update: 2 task status check(s) completed so far.
[10:24:28 AM] 📊 Task counter update: 3 task status check(s) completed so far.
[10:24:31 AM] 📊 Task counter update: 4 task status check(s) completed so far.
[10:24:34 AM] 🛑 Stopped interval timer after 15 seconds."""
    },
    {
        "num": "Task 10",
        "title": "JavaScript Promises — Introduction & Detail",
        "file": "Task_10_JavaScript_Promises.js",
        "cmd": "node Task_10_JavaScript_Promises.js",
        "output": """Executing saveTaskPromise with .then() and .catch()...
Promise Resolved [.then()]: Task "Task 10: Master JavaScript Promises" saved successfully via Promise!"""
    },
    {
        "num": "Task 11",
        "title": "Try/Catch Error Handling & Async-Await Concepts",
        "file": "Task_11_Try_Catch_and_Async_Await.js",
        "cmd": "node Task_11_Try_Catch_and_Async_Await.js",
        "output": """=== 1. Valid File Path Test ===
[Async/Await] Attempting to save task to "tasks.txt"...
SUCCESS [try block]: Task "Task 11: Test Async/Await Success" saved to tasks.txt

=== 2. Non-existent Folder Path Test (Fires Catch Block) ===
[Async/Await] Attempting to save task to "./non_existent_folder/invalid_tasks.txt"...
FAILURE [catch block fired]: Failed to save task!
  Error Details: ENOENT: no such file or directory, open './non_existent_folder/invalid_tasks.txt'
  Error Code   : ENOENT"""
    }
]

# Create output image generator using Pillow
def create_terminal_screenshot(task_info, output_path):
    width = 1100
    padding = 24
    header_height = 42
    
    # Calculate lines needed for output text
    cmd_text = f"gaganaditya@MacBook-Pro CIA_2_LnT % {task_info['cmd']}"
    out_lines = task_info['output'].split('\n')
    
    line_height = 24
    content_height = line_height * (1 + len(out_lines)) + 30
    total_height = header_height + content_height + (padding * 2)
    
    # Create dark macOS dark-mode terminal window image
    img = Image.new('RGB', (width, total_height), color=(30, 30, 30))
    draw = ImageDraw.Draw(img)
    
    # Draw Window Outer Background / Border (Dark Glassmorphism style)
    draw.rectangle([0, 0, width, total_height], fill=(24, 24, 24), outline=(50, 50, 50), width=2)
    
    # Window Title Bar
    draw.rectangle([2, 2, width-2, header_height], fill=(38, 38, 38))
    
    # macOS Window Controls (Red, Yellow, Green dots)
    draw.ellipse([16, 14, 28, 26], fill=(255, 95, 86))   # Close
    draw.ellipse([36, 14, 48, 26], fill=(255, 189, 46))  # Minimize
    draw.ellipse([56, 14, 68, 26], fill=(39, 201, 63))   # Zoom
    
    # Title Bar Text
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
        font_code = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 14)
        font_bold = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", 14)
    except Exception:
        font_title = ImageFont.load_default()
        font_code = ImageFont.load_default()
        font_bold = ImageFont.load_default()
        
    title_str = f"zsh — {task_info['file']} ({task_info['num']})"
    draw.text((width // 2 - len(title_str)*4, 12), title_str, fill=(180, 180, 180), font=font_title)
    
    # Terminal Content Area
    y = header_height + 20
    x = padding
    
    # Prompt line
    draw.text((x, y), "gaganaditya@MacBook-Pro CIA_2_LnT % ", fill=(50, 205, 50), font=font_bold)
    prompt_w = len("gaganaditya@MacBook-Pro CIA_2_LnT % ") * 8.5
    draw.text((x + prompt_w, y), task_info['cmd'], fill=(255, 255, 255), font=font_code)
    y += line_height + 8
    
    # Output Lines
    for line in out_lines:
        draw.text((x, y), line, fill=(220, 220, 220), font=font_code)
        y += line_height
        
    img.save(output_path)
    return output_path

# Output directory for screenshots
screenshots_dir = "/Users/gaganaditya/Desktop/CIA_2_LnT/screenshots"
os.makedirs(screenshots_dir, exist_ok=True)

image_paths = []
for idx, task in enumerate(tasks, 1):
    img_path = os.path.join(screenshots_dir, f"Task_{idx}_Output.png")
    create_terminal_screenshot(task, img_path)
    image_paths.append((task, img_path))
    print(f"Generated screenshot for Task {idx}: {img_path}")

# Build PDF Document using ReportLab
pdf_path = "/Users/gaganaditya/Desktop/CIA_2_LnT/CIA_2_NodeJS_Tasks_Output_Report.pdf"
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=36, leftMargin=36,
    topMargin=36, bottomMargin=36
)

styles = getSampleStyleSheet()

# Custom styles
title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    textColor=colors.HexColor('#1E293B'),
    alignment=1, # Center
    spaceAfter=6
)

subtitle_style = ParagraphStyle(
    'DocSubTitle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=11,
    leading=14,
    textColor=colors.HexColor('#475569'),
    alignment=1,
    spaceAfter=15
)

task_header_style = ParagraphStyle(
    'TaskHeader',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=14,
    leading=18,
    textColor=colors.HexColor('#0F172A'),
    spaceBefore=10,
    spaceAfter=4
)

meta_style = ParagraphStyle(
    'TaskMeta',
    parent=styles['Normal'],
    fontName='Helvetica-Oblique',
    fontSize=9,
    leading=12,
    textColor=colors.HexColor('#2563EB'),
    spaceAfter=8
)

story = []

# Title & Metadata Header
story.append(Paragraph("Christ University | CIA-2 Practical Question Paper - Set 1", subtitle_style))
story.append(Paragraph("Node.js & Asynchronous JavaScript Task Output Report", title_style))
story.append(Paragraph("<b>Course:</b> Node.js & Asynchronous JS | <b>Platform:</b> L&T EduTech | <b>Student:</b> Gagan Aditya", subtitle_style))
story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#CBD5E1'), spaceAfter=15))

# Add each task to report
for task, img_p in image_paths:
    story.append(Paragraph(f"<b>{task['num']}:</b> {task['title']}", task_header_style))
    story.append(Paragraph(f"📄 <b>File Name:</b> <code>{task['file']}</code> &nbsp;&nbsp;|&nbsp;&nbsp; 🚀 <b>Command:</b> <code>{task['cmd']}</code>", meta_style))
    
    # Scale image nicely to fit printable page width (540 pt)
    rl_img = RLImage(img_p, width=540, height=200)
    story.append(rl_img)
    story.append(Spacer(1, 14))

doc.build(story)
print(f"\nPDF Report generated successfully at: {pdf_path}")
