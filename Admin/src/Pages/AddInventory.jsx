import React, { useState, useEffect } from "react";

const AddInventory = () => {
  const initialFormData = {
    name: "",
    category: "",
    stock: "",
    threshold: "",
    unit: "",
    lastRestocked: "",
    supplier: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [inventoryList, setInventoryList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch inventory items from backend
  const fetchInventory = async () => {
  setLoading(true);
  try {
    const response = await fetch("http://localhost:5000/api/inventory");
    const text = await response.text();

    console.log("Raw response text:", text);
    if (!response.ok) throw new Error(`Server error: ${text}`);

    const data = JSON.parse(text); // parse only after checking for OK
    setInventoryList(data);
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Error loading inventory");
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchInventory();
  }, []);

  // Handle input changes for form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update inventory item
  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date().toISOString();
    const dataToSubmit = {
      ...formData,
      stock: Number(formData.stock),
      threshold: Number(formData.threshold),
      lastRestocked: formData.lastRestocked,
  
    };
     console.log("Submitting data:", dataToSubmit);

  try {
  const response = await fetch(
    editingId
      ? `http://localhost:5000/api/inventory/${editingId}`
      : "http://localhost:5000/api/inventory",
    {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSubmit),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to submit data: ${errorText}`);
  }

  alert(editingId ? "Inventory item updated successfully!" : "Inventory item added successfully!");
  setFormData(initialFormData);
  setEditingId(null); // reset editing state
  fetchInventory(); // refresh list
} catch (error) {
  console.error("Error submitting data:", error);
  alert(`Failed to submit inventory item: ${error.message}`);
}};

  // Set form for editing selected item
  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      category: item.category,
      stock: item.stock,
      threshold: item.threshold,
      unit: item.unit,
      lastRestocked: new Date(item.lastRestocked).toISOString().slice(0, 10), // format yyyy-mm-dd
      supplier: item.supplier,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormData);
  };

  // Delete inventory item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/inventory/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");
      alert("Item deleted");
      fetchInventory();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete item.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editingId ? "Edit Inventory Item" : "Add Inventory Item"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
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
              min={0}
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
              min={0}
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

        <div className="flex space-x-4">
          <button type="submit" className="btn w-full mt-4">
            {editingId ? "Update Inventory" : "Add Inventory"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-secondary w-full mt-4"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-4">Inventory List</h3>
      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Stock</th>
              <th className="border border-gray-300 p-2">Threshold</th>
              <th className="border border-gray-300 p-2">Unit</th>
              <th className="border border-gray-300 p-2">Last Restocked</th>
              <th className="border border-gray-300 p-2">Supplier</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryList.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No inventory items found.
                </td>
              </tr>
            )}
            {inventoryList.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.category}</td>
                <td className="border border-gray-300 p-2">{item.stock}</td>
                <td className="border border-gray-300 p-2">{item.threshold}</td>
                <td className="border border-gray-300 p-2">{item.unit}</td>
                <td className="border border-gray-300 p-2">
                  {item.lastRestocked
  ? new Date(item.lastRestocked).toLocaleDateString()
  : "N/A"}

                </td>
                <td className="border border-gray-300 p-2">{item.supplier}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="btn-edit"
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn-delete"
                    title="Delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddInventory;
