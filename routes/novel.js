const express = require("express");
const authMiddleware = require("../middleware/auth");

const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const router = express.Router();

// 🔹 Prisma setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


// ➕ Add new novel
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const novel = await prisma.novel.create({
      data: { title, description },
    });

    res.json(novel);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error adding novel");
  }
});


// ➕ Add chapter
router.post("/chapter/add", authMiddleware, async (req, res) => {
  try {
    const { title, content, novelId } = req.body;

    const chapter = await prisma.chapter.create({
      data: { title, content, novelId },
    });

    res.json(chapter);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error adding chapter");
  }
});


// 📚 Get all novels
router.get("/", async (req, res) => {
  try {
    const novels = await prisma.novel.findMany();
    res.json(novels);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error fetching novels");
  }
});


// 📄 Get chapters of a novel
router.get("/:id/chapters", async (req, res) => {
  try {
    const chapters = await prisma.chapter.findMany({
      where: {
        novelId: parseInt(req.params.id),
      },
    });

    res.json(chapters);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error fetching chapters");
  }
});


// 📖 Get single chapter
router.get("/chapter/:id", async (req, res) => {
  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json(chapter);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error fetching chapter");
  }
});

module.exports = router;