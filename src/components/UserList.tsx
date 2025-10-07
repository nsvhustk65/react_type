import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  phone: string;
  website: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gọi API khi component mount
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch(() => setError("Không thể load dữ liệu"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            style={{ cursor: "pointer", marginBottom: "5px" }}
            onClick={() => setSelectedUser(user)}
          >
            {user.id}. {user.name} | {user.phone}
          </li>
        ))}
      </ul>

      <h2>Thông tin chi tiết</h2>
      {selectedUser ? (
        <div>
          <p><b>Họ và tên:</b> {selectedUser.name}</p>
          <p><b>Số điện thoại:</b> {selectedUser.phone}</p>
          <p><b>Email:</b> {selectedUser.email}</p>
          <p><b>Website:</b> {selectedUser.website}</p>
        </div>
      ) : (
        <p>👉 Click vào một user để xem chi tiết</p>
      )}
    </div>
  );
}
