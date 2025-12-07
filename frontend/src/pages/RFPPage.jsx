import React, { useState, useEffect } from "react";
import axios from "axios";

const RFPPage = () => {
  const [rfps, setRfps] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: "", specs: "" }]);

  useEffect(() => {
    fetchRfps();
  }, []);

  const fetchRfps = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rfps");
      setRfps(response.data);
    } catch (error) {
      console.error("Error fetching RFPs:", error);
    }
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: "", specs: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/rfps", {
        title,
        description,
        budget: budget || null,
        items,
      });
      setTitle("");
      setDescription("");
      setBudget("");
      setItems([{ name: "", quantity: "", specs: "" }]);
      fetchRfps();
    } catch (error) {
      console.error("Error creating RFP:", error);
    }
  };

  return (
    <div>
      <h2>RFPs</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <h4>Items</h4>
        {items.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              required
            />
            <input
              type="text"
              placeholder="Specs"
              value={item.specs}
              onChange={(e) => handleItemChange(index, "specs", e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <button type="submit">Create RFP</button>
      </form>

      <h3>All RFPs</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Budget</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {rfps.map((rfp) => (
            <tr key={rfp._id}>
              <td>{rfp.title}</td>
              <td>{rfp.description}</td>
              <td>{rfp.budget ? `$${rfp.budget}` : "N/A"}</td>
              <td>{new Date(rfp.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RFPPage;