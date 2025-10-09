import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  description: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const limit = 5; // số sản phẩm mỗi trang

  // Gọi toàn bộ sản phẩm 1 lần duy nhất
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Product[]>("http://localhost:3000/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Lọc sản phẩm
  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchesMin = minPrice === "" || p.price >= Number(minPrice);
      const matchesMax = maxPrice === "" || p.price <= Number(maxPrice);
      return matchesSearch && matchesMin && matchesMax;
    });
    setFilteredProducts(filtered);
    setPage(1);
  };

  // Cắt mảng theo trang hiện tại
  const startIndex = (page - 1) * limit;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(filteredProducts.length / limit);

  return (
    <div className="container-fluid">
      <h2 className="mb-4">📚 Quản lý sản phẩm</h2>

      {/* Bộ lọc */}
      <form className="row g-2 mb-4" onSubmit={handleFilter}>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Giá từ"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Giá đến"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit">
            Lọc
          </button>
        </div>
      </form>

      {/* Bảng sản phẩm */}
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Danh mục</th>
                <th>Kho</th>
                <th>Mô tả</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        style={{
                          width: "60px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.price.toLocaleString()} đ</td>
                    <td>{p.category}</td>
                    <td>
                      <span
                        className={`badge ${
                          p.inStock ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {p.inStock ? "Còn hàng" : "Hết hàng"}
                      </span>
                    </td>
                    <td>{p.description.slice(0, 40)}...</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2">Sửa</button>
                      <button className="btn btn-sm btn-danger">Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    Không có sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Phân trang */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${page === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
