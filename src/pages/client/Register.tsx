import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface RegisterForm {
  username: string;
  email: string; 
  password: string;
}

export default function Register() {
  const nav = useNavigate(); 
  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (values: RegisterForm) => {
      const res = await axios.post("http://localhost:3000/register", values);
      return res.data;
    },
    onSuccess() {
      alert("Đăng ký thành công!");
      nav("/login");
    },
    onError() {
      alert("Đăng ký thất bại. Vui lòng thử lại!");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
