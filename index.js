import express from "express";
import cookieParser from "cookie-parser";
import { writeData, initDataFile, readData, getArticle } from "./helper.js"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"))
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("Running on port 3000");
});


app.get("/", async (req, res) => {
  const articles = await readData();
  res.render("index.ejs", { articles });
});

app.get("/admin", async (req, res) => {
  if (!req.cookies.user) return res.redirect("/");

  const articles = await readData();
  res.render("admin/index", { articles });
});

app.get("/login", async (req, res) => {
  res.render("login/index", { error: "" });
});

app.post("/sign-in", async (req, res) => {
  const { user, password } = req.body;

  if (user === "admin" && password === "1234") {
    res.cookie("user", JSON.stringify({ user }));
    return res.redirect("/admin");
  }

  res.render("login/index", { error: "Invalid username or password." });
});

app.get("/article/new", (req, res) => {
  if (!req.cookies.user) return res.redirect("/");
  res.render("article/new");
});

app.get("/article/:id", async (req, res) => {
  const { id } = req.params;

  const article = await getArticle(id);

  res.render("article/index", { article });
});

app.post("/article/add", async (req, res) => {
  const { title, date, content } = req.body
  let articles = await readData();

  const dateConverted = new Date(date)

  const formattedDate = dateConverted.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let article = {
    title,
    date: formattedDate,
    content,
    id: articles.length + 1,
  };

  articles.push(article);

  await writeData(articles);

  return res.redirect("/admin");
});

app.get("/article/edit/:id", async (req, res) => {
  const { id } = req.params;

  const article = await getArticle(id);
  if (!article) {
    res.redirect("/");
    return;
  }

  res.render("article/edit", { article });
});

app.post("/article/modify/:id", async (req, res) => {
  const { id } = req.params;
  const articles = await readData();

  let index = articles.findIndex((a) => Number(a["id"]) === Number(id));

  Object.entries(req.body).forEach(([key, value]) => {
    value && (articles[index][key] = value);
  });

  await writeData(articles);

  return res.redirect("/admin");
});

app.get("/article/delete/:id", async (req, res) => {
  const { id } = req.params;

  const articles = await readData();

  let index = articles.findIndex((a) => Number(a["id"]) === Number(id));

  if(index === -1) {
      return res.redirect("/admin");    
  }

  return res.render("article/delete", { id: Number(id) });
});

app.post("/article/delete/:id", async (req, res) => {
  const { id } = req.params;

  let articles = await readData();

  articles = articles.filter((article) => Number(article["id"]) !== Number(id));

  await writeData(articles);

  return res.redirect("/admin");
});

initDataFile();
