const express = require("express");

const server = express();

server.use(express.json());

const projects = [{ id: 1, title: "Teste 01" }];

function projectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  if (!id) {
    return res.json({ msg: "ID is required" });
  }

  if (!title) {
    return res.json({ msg: "Title is required" });
  }

  projects.push({ id, title });

  return res.json({ msg: "Created Successfully", data: { id, title } });
});

server.put("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.json({ msg: "Title is required" });
  }

  for (let i = 0; i < projects.length; i++) {
    if (parseInt(projects[i].id) === parseInt(id)) {
      projects[i].title = title;

      return res.json({
        msg: "Project updated successfully",
        data: projects[i]
      });
    }
  }

  return res.json({ msg: "Created Successfully", data: { id, title } });
});

server.delete("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.json({ msg: "Title is required" });
  }

  for (let i = 0; i < projects.length; i++) {
    if (parseInt(projects[i].id) === parseInt(id)) {
      let deleted = projects[i];

      projects.splice(i, 1);

      return res.json({
        msg: "Project deleted successfully",
        data: deleted
      });
    }
  }

  return res.json({ msg: "Created Successfully", data: { id, title } });
});

server.get("/projects/:id/tasks", projectExists, (req, res) => {
  const { id } = req.params;

  for (let i = 0; i < projects.length; i++) {
    if (parseInt(projects[i].id) === parseInt(id)) {
      return res.json(projects[i].tasks);
    }
  }
});

server.post("/projects/:id/tasks", projectExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  for (let i = 0; i < projects.length; i++) {
    if (parseInt(projects[i].id) === parseInt(id)) {
      if (!projects[i]["tasks"]) {
        projects[i]["tasks"] = [];
      }

      projects[i]["tasks"].push(task);

      return res.json({ msg: "Task created successfully", data: projects[i] });
    }
  }
});

server.listen(8000);
console.log("Listen 8000 port ...");
