import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Các trang con của Layout */}
        <Route index element={<h2>Chào mừng đến Trang chủ</h2>} />
        <Route path="list" element={<List />} />
         <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="add" element={<Add />} />
        <Route path="edit/:id" element={<Edit />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Bạn có thể thêm các route khác ở đây */}
      </Route>
    </Routes>
  );
}

export default App;
