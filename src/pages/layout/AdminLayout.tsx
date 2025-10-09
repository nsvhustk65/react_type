import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";

function AdminLayout() {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <Sidebar />
        <main className="col p-4 bg-light">
          <Outlet /> {/* Trang con hiển thị ở đây */}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
