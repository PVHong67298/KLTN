import {
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentOrderCount } from "../../features/statistic/currentOrderSlice";
import { fetchCurrentRevenue } from "../../features/statistic/currentRevenueSlice";
import { fetchMonthlyOrderCount } from "../../features/statistic/monthlyOrderSlice";
import { fetchMonthlyRevenue } from "../../features/statistic/monthlyRevenueSlice";

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, PointElement, LineElement);

const Home = () => {
  const [orderData, setOrderData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const dispatch = useDispatch();
  const monthlyRevenue = useSelector((state) => state.monthlyRevenue);
  const monthlyOrder = useSelector((state) => state.monthlyOrder);
  const currentRevenue = useSelector((state) => state.currentRevenue);
  const currentOrder = useSelector((state) => state.currentOrder);
  const currentYear = new Date().getFullYear();
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Tháng mặc định là tháng hiện tại
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    dispatch(fetchMonthlyRevenue());
    dispatch(fetchMonthlyOrderCount());
    dispatch(fetchCurrentRevenue());
    dispatch(fetchCurrentOrderCount());

    // Fetch API phần trăm trạng thái đơn hàng
    const fetchOrderStatusData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/statistics/percent");
        const data = await response.json();
        setOrderStatusData(data.result);  // Cập nhật dữ liệu phần trăm trạng thái đơn hàng
      } catch (error) {
        console.error("Error fetching order status data:", error);
      }
    };

    fetchOrderStatusData();
  }, [dispatch]);

  useEffect(() => {
    console.log(month)
    // Fetch API phần trăm trạng thái đơn hàng
    const fetchRevenueData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3001/statistics/revenue_day_of_month?month=${month}`);
        const data = await response.json();
        const days = data.revenueByDay.map(item => item.day);
        const revenues = data.revenueByDay.map(item => item.totalRevenue);
        setRevenueData({ days, revenues });
      } catch (error) {
        console.error("Error fetching order status data:", error);
      }
    };
    fetchRevenueData();
  }, [month]);

  // Kết hợp dữ liệu dựa trên "month"
  const combinedData = monthlyRevenue.map((revenue) => {
  const orderData = monthlyOrder.find((order) => order.month === revenue.month) || { orderCount: 0 };
    return {
      month: revenue.month,
      totalRevenue: revenue.totalRevenue,
      orderCount: orderData.orderCount,
    };
  });

  const chartData = {
    labels: orderStatusData.map((item) => item.status),  // Các trạng thái đơn hàng
    datasets: [
      {
        data: orderStatusData.map((item) => parseFloat(item.percent)),  // Phần trăm cho mỗi trạng thái
        backgroundColor: [
          "#FF5733",  // Màu cho trạng thái "Cancelled"
          "#33FF57",  // Màu cho trạng thái "Completed"
          "#FFC300",  // Màu cho trạng thái "Pending"
          "#3399FF",  // Màu cho trạng thái "Processing"
        ],
        borderColor: "#fff",  // Màu viền của các phần trong biểu đồ
        borderWidth: 1,  // Độ rộng của viền
      },
    ],
  };

  const reData = {
    labels: revenueData.days, // Ngày
    datasets: [
      {
        label: 'Doanh Thu',
        data: revenueData.revenues, // Doanh thu
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ngày',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Doanh Thu (VND)',
        },
        beginAtZero: true,
      },
    },
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  return (
    <div className="container pt-2">
      <div className="row">
        <div className="col-lg-4 col-6">
          {/* small box */}
          <div className="small-box bg-info">
            <div className="inner">
              <h3>{currentRevenue.dailyRevenue || 0}đ</h3>
              <p>Doanh Thu Hôm Nay</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-4 col-6">
          {/* small box */}
          <div className="small-box bg-success">
            <div className="inner">
              <h3>{currentRevenue.weeklyRevenue || 0}đ</h3>
              <p>Doanh Thu Tuần Nay</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
          </div>
        </div>
        {/* ./col */}
        <div className="col-lg-4 col-6">
          {/* small box */}
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>{currentRevenue.monthlyRevenue || 0}đ</h3>
              <p>Doanh Thu Tháng Nay</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <section className="col-lg-6 connectedSortable ui-sortable">
          <div className="card bg-gradient-white">
            <div className="card-header border-0">
              <h3 className="card-title">
                <i className="fas fa-th mr-1" />
                Các Đơn Hàng
              </h3>
            </div>
            <div className="card-body">
              <div
                className="table-responsive"
                style={{
                  maxHeight: "300px",
                  display: "flex",
                  justifyContent: "center",  // Căn giữa theo chiều ngang
                  alignItems: "center",      // Căn giữa theo chiều dọc
                  height: "100%",            // Đảm bảo phần div chiếm toàn bộ chiều cao của parent
                }}
              >
                {orderStatusData.length > 0 ? (
                  <Pie data={chartData} options={{ responsive: true }} />
                ) : (
                  <p>Đang tải dữ liệu...</p>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="col-lg-6 connectedSortable ui-sortable">
          {/* solid sales graph */}
          <div className="card bg-gradient-white">
            <div className="card-header border-0">
              <h3 className="card-title">
                <i className="fas fa-th mr-1" />
                Doanh Thu Theo Tháng
              </h3>
            </div>
            <div className="card-body">
              <div
                className="table-responsive"
                style={{ maxHeight: "300px", overflowY: "auto" }} // Giới hạn chiều cao
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>Tháng</th>
                      <th>Doanh Thu</th>
                      <th>Số Đơn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinedData.map((data) => (
                      <tr key={data.month}>
                        <td>Tháng {data.month} năm {currentYear}</td>
                        <td>{data.totalRevenue.toLocaleString()} đ</td>
                        <td>{data.orderCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* /.card */}
        </section>
      </div>

      <div className="row">
        <section className="col-lg-12 connectedSortable ui-sortable">
          <div className="card bg-gradient-white">
            <div className="card-header border-0">
              <h3 className="card-title">
                <i className="fas fa-th mr-1" />
                Biểu Đồ Doanh Thu Theo Ngày
              </h3>
            </div>
            <div className="card-body">
              <div>
                <div>
                  <select className="form-control col-md-2 float-right" id="monthSelect" value={month} onChange={handleMonthChange}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((monthValue) => (
                      <option key={monthValue} value={monthValue}>
                        Tháng {monthValue}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ width: '100%' }}>
                  <Line data={reData} options={options} style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
