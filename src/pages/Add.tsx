import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Product {
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

export default function Add() {
  const nav = useNavigate();
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    imageUrl: "",
    category: "",
    inStock: false,
  });

  const { mutate } = useMutation({
    mutationKey: ["add"],
    mutationFn: async (values: Product) => {
      const res = await axios.post("http://localhost:3000/products", values);
      return res.data;
    },
    onSuccess() {
      alert("Thêm sản phẩm thành công!");
      nav("/list");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Add Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            className="form-control"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">--Chọn category--</option>
            <option value="ab">ab</option>
            <option value="cc">cc</option>
          </select>
        </div>

        {/* In Stock */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
          />
          <label className="form-check-label">In Stock</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
