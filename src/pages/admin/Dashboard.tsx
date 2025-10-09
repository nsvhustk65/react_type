function Dashboard() {
  return (
    <div className="container-fluid">
      <h2 className="mb-4">Bảng điều khiển</h2>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-bg-primary">
            <div className="card-body">
              <h5 className="card-title">Tổng sản phẩm</h5>
              <p className="card-text fs-4 fw-bold">128</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-bg-success">
            <div className="card-body">
              <h5 className="card-title">Đơn hàng hôm nay</h5>
              <p className="card-text fs-4 fw-bold">24</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-bg-warning">
            <div className="card-body">
              <h5 className="card-title">Khách hàng mới</h5>
              <p className="card-text fs-4 fw-bold">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
