import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const nav = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values: LoginForm) => {
      const res = await axios.post("http://localhost:3000/login", values);
      return res.data;
    },
onSuccess(data) {
  alert("Đăng nhập thành công!");
  if (data?.accessToken) {
    localStorage.setItem("token", data.accessToken);
  }
  if (data?.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  nav("/"); 
  window.location.reload(); // reload để Layout đọc lại localStorage và render tên
},
    onError() {
      alert("Sai email hoặc mật khẩu!");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}
