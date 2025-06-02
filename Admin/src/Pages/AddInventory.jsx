import React, { useState } from "react";

const AddInventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    threshold: "",
    unit: "",
    lastRestocked: "",
    supplier: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date().toISOString();
    const dataToSubmit = {
      ...formData,
      stock: Number(formData.stock),
      threshold: Number(formData.threshold),
      lastRestocked: new Date(formData.lastRestocked),
      createdAt: now,
      updatedAt: now,
    };

    try {
      const response = await fetch("http://localhost:5000/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      alert("Inventory item added successfully!");
      setFormData({
        name: "",
        category: "",
        stock: "",
        threshold: "",
        unit: "",
        lastRestocked: "",
        supplier: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to add inventory item.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Inventory Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Medication">Medication</option>
            <option value="PPE">PPE</option>
            <option value="Fluids">Fluids</option>
            <option value="Dressings">Dressings</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Threshold</label>
            <input
              type="number"
              name="threshold"
              value={formData.threshold}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Unit</label>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            placeholder="e.g., tablets, boxes"
          />
        </div>

        <div>
          <label className="block font-medium">Last Restocked</label>
          <input
            type="date"
            name="lastRestocked"
            value={formData.lastRestocked}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Supplier</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="btn w-full mt-4">
          Add Inventory
        </button>
      </form>
    </div>
  );
};

export default AddInventory;
