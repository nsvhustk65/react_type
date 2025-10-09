import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Định nghĩa kiểu User dựa theo API trả về từ /login
interface User {
  id: number;
  username: string;
  email: string;
}

function Layout() {
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser) as User);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/list?search=${encodeURIComponent(keyword)}`);
      setKeyword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Trang chủ
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Menu trái */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/list">
                  Danh sách
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Thêm mới
                </Link>
              </li>
            </ul>

            {/* Thanh tìm kiếm */}
            <form className="d-flex me-3" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm sản phẩm..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn btn-outline-light" type="submit">
                Tìm
              </button>
            </form>

            {/* Menu phải */}
            <ul className="navbar-nav">
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Đăng ký
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Đăng nhập
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <span className="nav-link">Xin chào, {user.username}</span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
