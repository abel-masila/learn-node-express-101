const express = require("express");
const Joi = require("@hapi/joi");

const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "NodeJS" },
  { id: 2, name: "CSS" },
  { id: 3, name: "C#" }
];

app.get("/", (req, res) => {
  res.send("Hello Home");
});
//all courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
//single course
app.get("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  //filter courses array by id
  const course = courses.find(c => c.id === parseInt(id));
  if (!course)
    res.status(404).send("The course with the given ID was not found");
  res.send(course);
});
//post request
app.post("/api/courses", (req, res) => {
  const Schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(req.body, Schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.status(201).send(course);
});
//listen to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
