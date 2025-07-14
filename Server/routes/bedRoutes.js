const express = require("express");
const { getAllBeds, getBedById, createBed, updateBed, deleteBed } = require("../controllers/bedController");

const bedRouter = express.Router()

// GET all beds
bedRouter.get("/", getAllBeds);

// GET bed by ID
bedRouter.get("/:id", getBedById);

// POST new bed
bedRouter.post("/", createBed);

// PUT update bed
bedRouter.put("/:id", updateBed);

// DELETE bed
bedRouter.delete("/:id", deleteBed);

module.exports = bedRouter;
