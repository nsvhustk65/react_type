import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  category?: string;
  inStock?: boolean;
  price?: number;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get<Product>(
        `http://localhost:3000/products/${id}`
      );
      return res.data;
    },
    enabled: !!id, // chỉ chạy khi có id
  });

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (!product) return <p className="text-center mt-4">Không tìm thấy sản phẩm</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Hình ảnh */}
        <div className="col-md-5">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid border rounded shadow-sm"
          />
        </div>

        {/* Thông tin */}
        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-danger mb-3">{product.price} VND</h4>
          <p>{product.description || "Không có mô tả"}</p>
          <p>
            <strong>Trạng thái: </strong>
            <span className={product.inStock ? "text-success" : "text-danger"}>
              {product.inStock ? "Còn hàng" : "Hết hàng"}
            </span>
          </p>

          <div className="mt-3">
            <button className="btn btn-primary me-2">Mua ngay</button>
            <button className="btn btn-outline-success">Thêm vào giỏ</button>
          </div>

          <div className="mt-4">
            <Link to="/list" className="btn btn-secondary">
              ← Quay lại
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
