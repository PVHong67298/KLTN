import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import {
  Circle,
  LayerGroup,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { SidebarContext } from "../../context/SidebarContext";
import {
  fetchDetailsOrder,
  fetchOrders,
} from "../../features/order/orderSlice";
import { formatMoney } from "../../utils/formatMoney";
import { fetchOrderCoordinates } from "../../utils/getLongLat";
const Map = () => {
  const { orders, order } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [ordersWithCoordinates, setOrdersWithCoordinates] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(false);
  const { toggleSidebar } = useContext(SidebarContext);

  useEffect(() => {
    dispatch(fetchOrders(1, 100));
  }, [dispatch]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const filteredOrders = orders.filter(
        (order) => order.status === "Pending" || order.status === "Processing"
      );
      const result = await fetchOrderCoordinates(filteredOrders);
      setOrdersWithCoordinates(result);
    };

    fetchCoordinates();
  }, [orders]);
  const customIcon = L.icon({
    iconUrl: "/icon.png",
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
  });
  const homeIcon = L.icon({
    iconUrl: "/home.png",
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
  });
  const center = [20.98177624011233, 105.79562539037852];
  const handleMarkerClick = (id) => {
    setSelectedOrder(true);
    dispatch(fetchDetailsOrder(id));
  };
  const greenOptions = { color: "green", fillColor: "green" };
  const polyline = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ];
  const limeOptions = { color: "lime" };
  console.log(order);

  return (
    <>
      <div className="d-none">
        <div className="bg-primary border-bottom p-3 d-flex align-items-center justify-content-between">
          <h4 className="font-weight-bold m-0 text-white">Ưu đãi</h4>
          <div onClick={toggleSidebar}>
            <FaBars size={24} color="white" />
          </div>
        </div>
      </div>
      <div className="osahan-map">
        <section className="section bg-white osahan-track-order-page position-relative">
          <MapContainer
            center={center}
            zoom={10}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {ordersWithCoordinates.map((order, index) => (
              <React.Fragment key={index}>
                <LayerGroup>
                  <Circle
                    center={[order.coordinates.lat, order.coordinates.lon]}
                    pathOptions={greenOptions}
                    radius={100}
                  />
                </LayerGroup>

                <LayerGroup>
                  <Circle
                    center={[center[0], center[1]]}
                    pathOptions={greenOptions}
                    radius={100}
                  />
                </LayerGroup>

                <Marker
                  key={index}
                  icon={customIcon} // Use custom icon
                  position={[order.coordinates.lat, order.coordinates.lon]}
                  eventHandlers={{
                    click: () => handleMarkerClick(order._id),
                  }}
                >
                  <Popup>
                    <div>
                      <p>{order.name}</p>
                      <p>{order.address}</p>
                    </div>
                  </Popup>
                </Marker>
                <Polyline
                  pathOptions={limeOptions}
                  positions={
                    order.coordinates.lat > 0
                      ? [
                          [order.coordinates.lat, order.coordinates.lon],
                          [center[0], center[1]],
                        ]
                      : []
                  }
                />
              </React.Fragment>
            ))}
            <Marker
              icon={homeIcon} // Use custom icon
              position={[center[0], center[1]]}
            >
              <Popup>
                <div>
                  <p>Cửa hàng</p>
                  <p>Đây là địa chỉ cửa hàng</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
          {/* Order Details
           */}
          {selectedOrder && (
            <div className="container pt-5 pb-5">
              <div className="order-body">
                <div className="pb-3">
                  <section className="bg-white osahan-main-body rounded shadow-sm overflow-hidden">
                    <div className="osahan-status">
                      <div className="p-3 status-order bg-white border-bottom d-flex align-items-center">
                        <p className="m-0">
                          <i className="feather-calendar text-primary"></i>{" "}
                          {new Date(order?.order?.updated_at).toLocaleString()}
                        </p>
                      </div>

                      <div className="p-3 border-bottom bg-white">
                        <h6 className="font-weight-bold">Địa chỉ</h6>
                        <p className="m-0 small">{order.order?.address}</p>
                      </div>
                      <div className="p-3 border-bottom">
                        <p className="font-weight-bold   mb-1">Đơn hàng</p>

                        {order.detailOrders?.map((item, index) => (
                          <Fragment key={index}>
                            <img
                              alt="#"
                              src={item.food.image}
                              className="img-fluid sc-osahan-logo mr-2"
                            />{" "}
                            <span className="text-primary font-weight-bold d-flex align-items-center justify-content-between ">
                              <div>{item.food.name} </div>
                              <div>{formatMoney(item.food.price)}</div>
                            </span>
                            <span className="text-muted small">
                              Số lượng: {item.quantity}
                            </span>
                            {item.toppings.map((topping, i) => (
                              <div
                                key={i}
                                className="gold-members d-flex align-items-center justify-content-between   py-2 border-bottom"
                              >
                                <div className="media align-items-center">
                                  <div className="mr-2">&middot;</div>
                                  <div className="media-body">
                                    <p className="m-0"> {topping.name} </p>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <p className="text-gray mb-0 float-right ml-2 text-muted small">
                                    {formatMoney(topping.price)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </Fragment>
                        ))}
                      </div>
                      <div className="p-3 bg-white">
                        <div className="d-flex align-items-center mb-2">
                          <h6 className="font-weight-bold mb-1">Tạm tính</h6>
                          <h6 className="font-weight-bold ml-auto mb-1">
                            {formatMoney(order.order?.amount)}
                          </h6>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <h6 className="mb-1 text-muted" style={{ fontWeight: 'normal' }}>Quãng đường</h6>
                          <h6 className="ml-auto mb-1 text-muted" style={{ fontWeight: 'normal' }}>
                            {order.order?.distance ? order.order?.distance : "0 km"}
                          </h6>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <h6 className="mb-1 text-muted" style={{ fontWeight: 'normal' }}>Thời gian giao</h6>
                          <h6 className="ml-auto mb-1 text-muted" style={{ fontWeight: 'normal' }}>
                            {order.order?.timeShip ? order.order?.timeShip : "0 phút"}
                          </h6>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <h6 className="mb-1">Phí giao hàng</h6>
                          <h6 className="ml-auto mb-1">
                            +{formatMoney(order.order?.ship ? order.order?.ship : 0)}
                          </h6>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <h6 className="font-weight-bold mb-1">Tổng tiền</h6>
                          <h6 className="font-weight-bold ml-auto mb-1">
                            {formatMoney(order.order?.amount + (order.order?.ship ? order.order?.ship : 0))}
                          </h6>
                        </div>
                        <p className="m-0 small text-muted">
                          Bạn có thể kiểm tra chi tiết đơn hàng của mình tại đây,
                          <br />
                          Cảm ơn bạn đã đặt hàng.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Map;
