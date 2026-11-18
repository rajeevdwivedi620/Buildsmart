# 🏗️ BuildTrack - Construction Project Management Platform

A simple, responsive, and easy-to-use web application to manage construction projects, workers, tasks, and materials in one place.

No more paper registers. No more WhatsApp confusion. Manage everything from one dashboard.

### 🔗 Live Demo
**👉 https://buildsmart-builtsmart.vercel.app/**

---

## ✨ Features

### 1. Project Management
- Add new project with Name, Location, Start Date, Deadline & Status
- Filter projects by Status - Active / Delayed / Completed
- Delete project with one click
- Example: Skyline Tower (Phagwara) - Active, Green Valley Villas (Jalandhar) - Delayed, City Mall (Ludhiana) - Completed

### 2. Task Assignment
- Assign tasks to workers with Project, Deadline & Status
- Mark task as Completed with one click
- Example: Pour foundation slab - Assigned to Ramesh - Skyline Tower - In Progress

### 3. Worker Management
- Add workers with Name, Role, Phone & Assigned Project
- Example: Ramesh Kumar - Mason - Skyline Tower, Anil Singh - Electrician - City Mall

### 4. Material Tracking
- Track Required vs Available quantity
- Automatic Shortage Calculation: `Shortage = Required - Available`
- Auto Status: `Need to Order` / `Sufficient`
- Example: Cement Required 500, Available 320, Shortage 180 -> Need to Order

### 5. Progress Dashboard
- Total Projects, Total Tasks, Total Workers
- Completed Tasks & Task Completion %
- Delay Identification
- Example: Task Completion 33%, Delayed Projects 2

---

## 🛠️ Tech Stack / What Is Used

| Technology | Used For |
| --- | --- |
| **HTML** | Structure - All Pages, Forms, Tables, Buttons |
| **CSS** | Design & Responsive Layout - Flexbox, Grid, Media Queries |
| **JavaScript** | Functionality & Logic - Arrays, Objects, DOM Manipulation |
| **VS Code** | Code Editor |
| **Vercel** | Hosting & Deployment |

**No Backend, No Database.** All data is stored in JavaScript Arrays & Objects and updated in real-time without page reload.

### JavaScript Logic Used:
- `Shortage = Required - Available`
- `If Today's Date > Deadline -> Mark as Delayed`
- `Task Completion % = (Completed Tasks / Total Tasks) * 100`
- DOM Manipulation for instant table updates

---

## 📄 Pages

- **Home** - Overview & Navigation
- **Projects** - Create & Manage Projects
- **Tasks** - Assign & Track Tasks
- **Workers** - Manage Worker
- **Materials** - Track Material Stock & Shortage
- **Dashboard** - Full Project Analytics

---

## 🚀 How To Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/buildtrack.git

# 2. Open the folder
cd buildtrack

# 3. Open index.html in browser
# No installation needed. Just double-click index.html
