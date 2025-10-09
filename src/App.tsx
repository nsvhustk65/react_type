import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./pages/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Add from "./pages/admin/Add";
import Edit from "./pages/admin/Edit";
import ClientLayout from "./pages/layout/ClientLayout"
import List from "./pages/client/List";
import ProductDetail from "./pages/client/ProductDetail";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";

function App() {
  return (
    <Routes>
      {/* Client */}
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<h2>Chào mừng đến Koparion 📚</h2>} />
        <Route path="list" element={<List />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="add" element={<Add />} />
        <Route path="edit/:id" element={<Edit />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
