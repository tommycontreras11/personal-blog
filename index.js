import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const app = express()

app.use(express.static("public"))

app.listen(3000, () => {
    console.log("Running on port 3000")
})

const reRenderPage = (page) => {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    return path.join(__dirname, page)
}

app.get("/", (req, res) => {
    res.sendFile(reRenderPage("index.html"))
})

app.get("/article/add", (req, res) => {
    res.sendFile(reRenderPage("/article/new.html"))
})

app.post("/article/add", (req, res) => {
    console.log(req.body)
})

// addArticleToJson = async (data) => {
//     await fs.writeFile(ARTICLE_JSON, JSON.stringify(data, null, 2), "utf8")
// }