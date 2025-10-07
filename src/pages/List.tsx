import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

// Định nghĩa kiểu Product
interface Product {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  category?: string;
  inStock?: boolean;
}

export default function List() {
  const [page, setPage] = useState(1);
  const limit = 8;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("search") || ""; // lấy từ URL

  // Fetch products với pagination + search
  const { data, isLoading } = useQuery<{
    products: Product[];
    total: number;
  }>({
    queryKey: ["products", page, keyword],
    queryFn: async () => {
      const res = await axios.get<Product[]>(
        `http://localhost:3000/products?_page=${page}&_limit=${limit}&q=${keyword}`
      );
      return {
        products: res.data,
        total: Number(res.headers["x-total-count"]),
      };
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading || !data) return <p className="text-center mt-4">Loading...</p>;

  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Nội dung */}
      <div className="container mt-4 flex-grow-1">
        <h2 className="mb-4">Danh sách Products</h2>

        {keyword && (
          <p className="text-muted">
            Kết quả tìm kiếm cho: <strong>{keyword}</strong>
          </p>
        )}

        <div className="row g-4">
          {data.products.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.imageUrl}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "250px", objectFit: "cover", width: "100%" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <Link
                      to={`/products/${p.id}`}
                      className="text-decoration-none"
                    >
                      {p.name}
                    </Link>
                  </h5>
                  <p className="card-text text-truncate">
                    {p.description || "No description"}
                  </p>
                  {/* Nút đối xứng nhau */}
                  <div className="mt-auto d-flex justify-content-between">
                    <button className="btn btn-primary">Mua ngay</button>
                    <button className="btn btn-outline-success">
                      Add cart
                    </button>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <small className="text-muted">{p.category}</small>
                  <small
                    className={p.inStock ? "text-success" : "text-danger"}
                  >
                    {p.inStock ? "Còn hàng" : "Hết hàng"}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phân trang luôn ở dưới */}
      {totalPages > 1 && (
        <footer className="mt-auto py-3 bg-light">
          <nav>
            <ul className="pagination justify-content-center mb-0">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${page === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </footer>
      )}
    </div>
  );
}
