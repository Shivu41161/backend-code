const express = require("express");
const Item = require("./models");

const router = express.Router();

// Create Item
router.post("/items", async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

// Read Items
router.get("/items", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// Update Item
router.put("/items/:id", async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Item
router.delete("/items/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
});

module.exports = router;
