/* ===== DATA: in-memory arrays of objects (resets on page reload) ===== */
var projects = [
  { name: "Skyline Tower", location: "Phagwara", start: "2026-01-10", deadline: "2027-03-30", status: "Active" },
  { name: "Green Valley Villas", location: "Jalandhar", start: "2026-02-01", deadline: "2026-09-15", status: "Delayed" },
  { name: "City Mall", location: "Ludhiana", start: "2025-06-01", deadline: "2026-08-01", status: "Completed" },
  { name: "Riverside Bridge", location: "Kapurthala", start: "2026-03-05", deadline: "2026-10-20", status: "Active" }
];
var tasks = [
  { name: "Pour foundation slab", project: "Skyline Tower", worker: "Ramesh", deadline: "2026-12-05", phase: "Foundation", status: "In Progress" },
  { name: "Brick wall level 2", project: "Green Valley Villas", worker: "Suresh", deadline: "2026-11-30", phase: "Structure", status: "Pending" },
  { name: "Wiring and fittings", project: "City Mall", worker: "Anil", deadline: "2026-07-20", phase: "Finishing", status: "Completed" }
];
var workers = [
  { name: "Ramesh Kumar", role: "Mason", phone: "9876543210", project: "Skyline Tower" },
  { name: "Anil Singh", role: "Electrician", phone: "9812345678", project: "City Mall" },
  { name: "Sunil Yadav", role: "Plumber", phone: "9898989898", project: "Riverside Bridge" }
];
var materials = [
  { name: "Cement", required: 500, available: 320 },
  { name: "Bricks", required: 10000, available: 12000 }
];

/* ===== HELPER FUNCTIONS ===== */
// short name for document.getElementById
function $(id) { return document.getElementById(id); }

// today's date as "YYYY-MM-DD" (same format as date inputs, so strings can be compared)
function todayStr() { return new Date().toISOString().slice(0, 10); }

// returns true if project is Delayed, or deadline passed and not Completed
function isDelayed(p) {
  return p.status === "Delayed" || (p.deadline < todayStr() && p.status !== "Completed");
}

// loops over projects array and fills a <select> with <option> tags
function fillProjectSelect(id) {
  var html = "";
  for (var i = 0; i < projects.length; i++) {
    html += "<option>" + projects[i].name + "</option>";
  }
  $(id).innerHTML = html;
}

/* ===== PROJECTS PAGE ===== */
// draws table rows; applies the status filter with a conditional inside a loop
function renderProjects() {
  var filter = $("pFilter").value, rows = "";
  for (var i = 0; i < projects.length; i++) {
    var p = projects[i];
    if (filter === "All" || p.status === filter) {
      rows += "<tr><td>" + p.name + "</td><td>" + p.location + "</td><td>" + p.start + "</td><td>" + p.deadline +
        "</td><td><span class='badge " + p.status + "'>" + p.status + "</span></td>" +
        "<td><button class='btn small danger' onclick='deleteProject(" + i + ")'>Delete</button></td></tr>";
    }
  }
  $("projectBody").innerHTML = rows || "<tr><td colspan='6'>No projects found.</td></tr>";
}

// reads form values, validates dates, pushes a new object into the array
function addProject(e) {
  e.preventDefault(); // stop page reload
  var p = { name: $("pName").value, location: $("pLoc").value, start: $("pStart").value,
            deadline: $("pDeadline").value, status: $("pStatus").value };
  if (p.deadline < p.start) { $("msg").textContent = "Deadline cannot be before the start date."; return; }
  $("msg").textContent = "";
  projects.push(p);
  $("projectForm").reset();
  renderProjects();
}

// removes one project using splice(index, 1)
function deleteProject(index) { projects.splice(index, 1); renderProjects(); }

/* ===== TASKS PAGE ===== */
function renderTasks() {
  var rows = "";
  for (var i = 0; i < tasks.length; i++) {
    var t = tasks[i];
    var action = t.status === "Completed" ? "Done" :
      "<button class='btn small ok' onclick='completeTask(" + i + ")'>Mark Completed</button>";
    rows += "<tr><td>" + t.name + "</td><td>" + t.project + "</td><td>" + t.worker + "</td><td>" + t.deadline +
      "</td><td>" + t.phase + "</td><td><span class='badge " + t.status.replace(" ", "-") + "'>" + t.status +
      "</span></td><td>" + action + "</td></tr>";
  }
  $("taskBody").innerHTML = rows || "<tr><td colspan='7'>No tasks yet.</td></tr>";
}

// new tasks always start as Pending
function addTask(e) {
  e.preventDefault();
  tasks.push({ name: $("tName").value, project: $("tProject").value, worker: $("tWorker").value,
               deadline: $("tDeadline").value, phase: $("tPhase").value, status: "Pending" });
  $("taskForm").reset();
  renderTasks();
}

// changes status of one task object, then redraws the table
function completeTask(index) { tasks[index].status = "Completed"; renderTasks(); }

/* ===== WORKERS PAGE ===== */
// shows worker cards, only those matching the selected role
function renderWorkers() {
  var filter = $("wFilter").value, html = "";
  for (var i = 0; i < workers.length; i++) {
    var w = workers[i];
    if (filter === "All" || w.role === filter) {
      html += "<article class='card'><h3>" + w.name + "</h3><p><b>Role:</b> " + w.role + "</p><p><b>Phone:</b> " +
        w.phone + "</p><p><b>Project:</b> " + w.project + "</p></article>";
    }
  }
  $("workerGrid").innerHTML = html || "<p>No workers with this role.</p>";
}

function addWorker(e) {
  e.preventDefault();
  workers.push({ name: $("wName").value, role: $("wRole").value, phone: $("wPhone").value, project: $("wProject").value });
  $("workerForm").reset();
  renderWorkers();
}

/* ===== MATERIALS PAGE ===== */
// shortage = required - available; red "Need to Order" if shortage > 0, else green "Sufficient"
function renderMaterials() {
  var rows = "";
  for (var i = 0; i < materials.length; i++) {
    var m = materials[i];
    var shortage = m.required - m.available;
    var status = shortage > 0 ? "<span class='red'>Need to Order</span>" : "<span class='green'>Sufficient</span>";
    rows += "<tr><td>" + m.name + "</td><td>" + m.required + "</td><td>" + m.available + "</td><td>" +
      (shortage > 0 ? shortage : 0) + "</td><td>" + status + "</td></tr>";
  }
  $("materialBody").innerHTML = rows;
}

function addMaterial(e) {
  e.preventDefault();
  materials.push({ name: $("mName").value, required: Number($("mReq").value), available: Number($("mAvail").value) });
  $("materialForm").reset();
  renderMaterials();
}

/* ===== DASHBOARD PAGE ===== */
// counts using loops and conditionals, then writes results into the page
function renderDashboard() {
  var done = 0, pending = 0, progress = 0, delayedHtml = "", delayedCount = 0;
  var active = 0, completedP = 0;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "Completed") done++;
    else if (tasks[i].status === "In Progress") progress++;
    else pending++;
  }
  for (var j = 0; j < projects.length; j++) {
    var p = projects[j];
    if (p.status === "Completed") completedP++; else active++;
    if (isDelayed(p)) {
      delayedCount++;
      delayedHtml += "<li><b>" + p.name + "</b> (" + p.location + ") - deadline " + p.deadline + "</li>";
    }
  }
  var percent = tasks.length === 0 ? 0 : Math.round(done / tasks.length * 100);
  $("sProjects").textContent = projects.length;
  $("sTasks").textContent = tasks.length;
  $("sWorkers").textContent = workers.length;
  $("sDone").textContent = done;
  $("sDelayed").textContent = delayedCount;
  $("delayList").innerHTML = delayedHtml || "<li>No delayed projects.</li>";
  $("progressBar").style.width = percent + "%";
  $("progressBar").textContent = percent + "%";
  $("progressList").innerHTML = "<li>Tasks: " + done + " completed, " + progress + " in progress, " + pending +
    " pending</li><li>Projects: " + completedP + " completed, " + active + " ongoing</li>";
}

/* ===== PAGE SETUP: runs once, connects forms/buttons to functions ===== */
var page = document.body.getAttribute("data-page");
var navLinks = document.querySelectorAll(".links a"); // highlight current page in navbar
for (var n = 0; n < navLinks.length; n++) {
  if (navLinks[n].getAttribute("href") === page + ".html") navLinks[n].classList.add("active");
}
if (page === "projects") {
  $("projectForm").addEventListener("submit", addProject);
  $("pFilter").addEventListener("change", renderProjects);
  renderProjects();
} else if (page === "tasks") {
  fillProjectSelect("tProject");
  $("taskForm").addEventListener("submit", addTask);
  renderTasks();
} else if (page === "workers") {
  fillProjectSelect("wProject");
  $("workerForm").addEventListener("submit", addWorker);
  $("wFilter").addEventListener("change", renderWorkers);
  renderWorkers();
} else if (page === "materials") {
  $("materialForm").addEventListener("submit", addMaterial);
  renderMaterials();
} else if (page === "dashboard") {
  renderDashboard();
}