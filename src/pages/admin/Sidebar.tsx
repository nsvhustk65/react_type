import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`bg-dark text-white p-3 d-flex flex-column ${
        collapsed ? "col-1" : "col-2 col-md-3"
      }`}
      style={{ transition: "width 0.3s ease" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        {!collapsed && <h5 className="m-0">Koparion Admin</h5>}
        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => setCollapsed(!collapsed)}
          title="Thu gọn menu"
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      <nav className="nav flex-column">
        <Link
          to="/admin/users"
          className={`nav-link text-white ${isActive("/admin/users") ? "bg-secondary" : ""}`}
        >
          👤 {!collapsed && "Quản lý Người dùng"}
        </Link>
        <Link
          to="/admin/products"
          className={`nav-link text-white ${isActive("/admin/products") ? "bg-secondary" : ""}`}
        >
          📚 {!collapsed && "Quản lý Sản phẩm"}
        </Link>
        <Link
          to="/admin/categories"
          className={`nav-link text-white ${isActive("/admin/categories") ? "bg-secondary" : ""}`}
        >
          🗂️ {!collapsed && "Quản lý Danh mục"}
        </Link>
        <Link
          to="/admin/brands"
          className={`nav-link text-white ${isActive("/admin/brands") ? "bg-secondary" : ""}`}
        >
          🏷️ {!collapsed && "Quản lý Thương hiệu"}
        </Link>
      </nav>

      <div className="mt-auto text-center text-secondary small">
        © 2025 Koparion
      </div>
    </div>
  );
}

export default Sidebar;
