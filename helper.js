import fs from "fs/promises";

const FILE_PATH = "article.json";

export const writeData = async (data) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf8");
};

export const initDataFile = async () => {
  try {
    await fs.access(FILE_PATH);
  } catch {
    await writeData([]);
  }
};

export const readData = async () => {
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

export const getArticle = async (id) => {
  const articles = await readData();
  return articles.find((a) => Number(a["id"]) === Number(id));
};