const Joi = require("joi");
const express = require("express");

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  console.log('Logging...');
})

const books = [
  { id: 1, name: "Clean Code" },
  { id: 2, name: "The Road to React" },
  { id: 3, name: "You Don't Know JS" },
];

app.get("/", (req, res) => {
  res.send("Welcome to the Library API");
});

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book)
    return res.status(404).send("The book with the given ID was not found."); // 404
  res.send(book);
});

app.post("/api/books", (req, res) => {
  const { error } = validateBook(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const book = {
    id: books.length + 1,
    name: req.body.name,
  };
  books.push(book);
  res.send(book);
});

app.put("/api/books/:id", (req, res) => {
  // Look up the book
  // If not existing, return 404
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book)
    return res.status(404).send("The book with the given ID was not found."); // 404

  // Validate
  // If invalid, return 404
  const { error } = validateBook(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Update book
  book.name = req.body.name;
  // Return the updated book
  res.send(book);
});

app.delete("/api/books/:id", (req, res) => {
  // Look up the book
  // If not existing, return 404
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book)
    return res.status(404).send("The book with the given ID was not found."); // 404

  // Delete the book
  const index = books.indexOf(book);
  books.splice(index, 1);

  // Return the deleted course
  res.send(book);
});

function validateBook(book) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(book, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
