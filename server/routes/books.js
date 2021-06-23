const express = require("express");
const router = express.Router();

const books = [
    { id: 1, name: "Clean Code" },
    { id: 2, name: "The Road to React" },
    { id: 3, name: "You Don't Know JS" },
  ];

router.get("/", (req, res) => {
  res.send(books);
});

router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book)
    return res.status(404).send("The book with the given ID was not found."); // 404
  res.send(book);
});

router.post("/", (req, res) => {
  const { error } = validateBook(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const book = {
    id: books.length + 1,
    name: req.body.name,
  };
  books.push(book);
  res.send(book);
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
