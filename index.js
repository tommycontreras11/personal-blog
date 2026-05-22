import express from "express";
import fs from "fs/promises";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("Running on port 3000");
});

const FILE_PATH = "article.json";

const writeData = async (data) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf8");
};

const initDataFile = async () => {
  try {
    await fs.access(FILE_PATH);
  } catch {
    await writeData([]);
  }
};

const readData = async () => {
  try {
    const data = await fs.readFile(FILE_PATH, "utf8");

    if (!data.trim()) return [];

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") return [];

    console.error(error);
    return [];
  }
};

const getArticle = async (id) => {
  const articles = await readData();
  return articles.find((a) => Number(a["id"]) === Number(id));
};

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
  let articles = await readData();

  let article = {
    ...req.body,
    id: articles.length + 1,
  };

  articles.push(article);

  await writeData(articles);

  return res.redirect("/admin");
});

app.get(`/article/update/:id`, async (req, res) => {
  const { id } = req.params;

  const article = await getArticle(id);
  if (!article) {
    res.redirect("/");
    return;
  }

  res.render("article/update", { article });
});

app.post(`/article/modify/:id`, async (req, res) => {
  const { id } = req.params;
  const articles = await readData();

  let index = articles.findIndex((a) => Number(a["id"]) === Number(id));

  Object.entries(req.body).forEach(([key, value]) => {
    value && (articles[index][key] = value);
  });

  await writeData(articles);

  return res.redirect("/admin");
});

initDataFile();
