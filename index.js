const express = require("express");
const app = express();

const courses = [
  { id: 1, name: "NodeJS" },
  { id: 2, name: "CSS" },
  { id: 3, name: "C#" }
];

app.get("/", (req, res) => {
  res.send("Hello Home");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  //filter courses array by id
  const course = courses.find(c => c.id === parseInt(id));
  if (!course)
    res.status(404).send("The course with the given ID was not found");
  res.send(course);
});
//listen to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
