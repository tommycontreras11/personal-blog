import express from "express";
import fs from "fs/promises";

const app = express();

app.use(express.urlencoded({ extended: true }));
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
    return articles.find((a) => Number(a["id"]) === Number(id))
}

app.get("/", async (req, res) => {
  const articles = await readData();
  res.render("index.ejs", { articles });
});

app.get("/article/new", (req, res) => {
    res.render("article/new");
});

app.get(`/article/update/:id`, async (req, res) => {
    const { id } = req.params

    const article = await getArticle(id)
    if(!article) {
        res.redirect("/")
        return
    }

    res.render("article/update", { article })
})

app.post(`/article/update/:id`, async (req, res) => {
    const { id } = req.params
    const articles = await readData()

    let index = articles.findIndex((a) => Number(a["id"]) === Number(id))

    Object.entries(req.body).forEach(([key, value]) => {
        value && (articles[index][key] = value)
    })

    await writeData(articles)

    res.redirect("/")
})

app.post("/article/add", async (req, res) => {
  let articles = await readData();

  let article = {
    ...req.body,
    id: articles.length + 1,
  };

  articles.push(article);

  await writeData(articles);

  res.redirect("/article/new");
});

initDataFile();
