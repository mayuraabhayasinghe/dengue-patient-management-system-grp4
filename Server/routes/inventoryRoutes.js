const express = require("express");
const { createInventory, getAllInventory, getInventoryById, deleteInventory, updateInventory } = require("../controllers/inventoryController");

const inventoryRouter = express.Router();

inventoryRouter.post("/", createInventory);
inventoryRouter.get("/", getAllInventory);
inventoryRouter.get("/:id", getInventoryById);
inventoryRouter.put("/:id", updateInventory);
inventoryRouter.delete("/:id", deleteInventory);

module.exports = inventoryRouter;
