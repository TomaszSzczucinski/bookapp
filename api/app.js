const express = require("express");
const JSONdb = require("simple-json-db");
const axios = require("axios");
const cors = require("cors");
const slugify = require("slugify");
const { parse } = require("node-html-parser");

const db = new JSONdb("./book_database.json");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/fetch/:query", async (req, res) => {
  if (req.params.query) {
    const q = slugify(req.params.query, "%20");

    await axios("https://lubimyczytac.pl/szukaj/ksiazki?phrase=" + q).then(
      (html) => {
        const root = parse(html.data);
        const booksHtml = root.querySelectorAll(".authorAllBooks__single");

        const data = {
          books: [],
        };

        booksHtml.forEach((bookHtml) => {
          const book = {};

          book.title = bookHtml
            .querySelector(".authorAllBooks__singleTextTitle")
            .text.trim();
          book.author = bookHtml
            .querySelector(".authorAllBooks__singleTextAuthor")
            .text.trim();
          book.rating = bookHtml
            .querySelector(".listLibrary__ratingStarsNumber")
            .text.trim();
          book.cover = bookHtml
            .querySelector(".img-fluid")
            .getAttribute("data-src")
            .trim();
          book.id = bookHtml
            .querySelector(".authorAllBooks__singleTextTitle")
            .getAttribute("href")
            .split("/")[2];
          book.url =
            "https://lubimyczytac.pl" +
            bookHtml
              .querySelector(".authorAllBooks__singleTextTitle")
              .getAttribute("href")
              .trim();

          book.isSaved = db.has(book.id);

          data.books.push(book);
        });

        res.send(data);
      }
    );
  }
});

app.get("/books", (req, res) => {
  const data = db.JSON();

  const list = [];
  for (let key in data) {
    list.push(JSON.parse(data[key]));
  }

  res.send(list);
});

app.post("/books", (req, res) => {
  const payload = req.body;

  if (payload.id) {
    db.set(payload.id, JSON.stringify(payload));
    res.send("OK");
    return;
  }

  res.status(400).send("No ID");
});

app.delete("/books", (req, res) => {
  const payload = req.body;

  console.log(payload)

  if (payload.id) {
    db.delete(payload.id)
    res.send("OK")
    return
  }

  res.status(400).send("No ID");
})

app.listen(port, "0.0.0.0", () => {
  console.log(`Book App is listening at http://localhost:${port}`);
});
