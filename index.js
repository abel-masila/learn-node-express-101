const express = require("express");
const Joi = require("@hapi/joi");

const logger = require("./logger");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log("Logging...");
  next();
});
app.use(logger);

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
  if (!course) {
    return res.status(404).send("The course with the given ID was not found");
  }
  res.send(course);
});
//post request
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.status(201).send(course);
});
//update course
app.put("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  //lookup course from db
  const course = courses.find(c => c.id === parseInt(id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update item
  course.name = req.body.name;
  //return updated course item
  res.send(course);
});

//validate course
const validateCourse = course => {
  const Schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, Schema);
};
//delete it
app.delete("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  //lookup course from db
  const course = courses.find(c => c.id === parseInt(id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  const index = courses.indexOf(course);
  //delete course
  courses.splice(index, 1);
  res.send(course);
});
//listen to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
