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
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🟢 useEffect 1: Lấy danh sách users khi component mount
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch(() => setError("Không thể load danh sách người dùng"))
      .finally(() => setLoading(false));
  }, []);

  // 🔵 useEffect 2: Khi selectedUser thay đổi => gọi API lấy chi tiết
  useEffect(() => {
    if (selectedUser) {
      setUserDetail(null); // reset trước khi load dữ liệu mới
      setLoading(true);

      axios
        .get(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`)
        .then((res) => setUserDetail(res.data))
        .catch(() => setError("Không thể load chi tiết user"))
        .finally(() => setLoading(false));
    }
  }, [selectedUser]);

  if (loading && !userDetail && users.length === 0)
    return <p>Đang tải danh sách người dùng...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              cursor: "pointer",
              marginBottom: "5px",
              color: selectedUser?.id === user.id ? "blue" : "black",
            }}
            onClick={() => setSelectedUser(user)}
          >
            {user.id}. {user.name} | {user.phone}
          </li>
        ))}
      </ul>

      <h2>Thông tin chi tiết</h2>
      {selectedUser ? (
        loading ? (
          <p>Đang tải chi tiết user...</p>
        ) : userDetail ? (
          <div>
            <p><b>Họ và tên:</b> {userDetail.name}</p>
            <p><b>Số điện thoại:</b> {userDetail.phone}</p>
            <p><b>Email:</b> {userDetail.email}</p>
            <p><b>Website:</b> {userDetail.website}</p>
          </div>
        ) : (
          <p>Không có thông tin chi tiết</p>
        )
      ) : (
        <p>👉 Click vào một user để xem chi tiết</p>
      )}
    </div>
  );
}
