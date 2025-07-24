'use client';
import { useState, useEffect } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  const API_BASE = "http://localhost:8000/api/products";

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error();
      setProducts(data.products);
    } catch {
      setError("Failed to load products");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const saveProduct = async () => {
    if (!title.trim() || !price.trim()) {
      setError("Title and Price are required");
      console.log("Title and price are requied");
      
      return;
    }
    setLoading(true);
    setError("");
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price }),
      });
    
      const data = await res.json();
      if (!res.ok) {
        // Show Laravel validation errors
        const errorMsg = data.message || "Failed to save product";
        if (data.errors) {
          const firstError = Object.values(data.errors)[0][0]; // First validation error
          throw new Error(firstError);
        }
        throw new Error(errorMsg);
      }
    
      if (!data.success) throw new Error("Save failed");
    
      setTitle("");
      setPrice("");
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  } 
  const startEdit = (product) => {
    setTitle(product.title);
    setPrice(product.price);
    setEditingId(product.id);
    setError("");
  };

  const cancelEdit = () => {
    setTitle("");
    setPrice("");
    setEditingId(null);
    setError("");
  };

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error();
      fetchProducts();
    } catch {
      setError("Failed to delete product");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Product Manager</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product Title"
          className="border border-gray-300 rounded p-2 w-full mb-3"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Product Price"
          className="border border-gray-300 rounded p-2 w-full mb-3"
        />
        <div className="flex gap-3">
          <button
            onClick={saveProduct}
            disabled={loading}
            className="flex-grow bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? editingId
                ? "Updating..."
                : "Adding..."
              : editingId
              ? "Update Product"
              : "Add Product"}
          </button>
          {editingId && (
            <button
              onClick={cancelEdit}
              className="flex-grow bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>

      {/* Products List */}
      <h2 className="text-xl font-semibold mb-4 text-center">Products List</h2>

      {loading && <p className="text-center">Loading products...</p>}

      {!loading && products.length === 0 && (
        <p className="text-center text-gray-500">No products available.</p>
      )}

      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{product.title}</p>
              <p className="text-gray-600">${product.price}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(product)}
                className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
