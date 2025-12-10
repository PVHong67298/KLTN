import { TbMessageChatbot } from "react-icons/tb";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { IoLogoYoutube } from "react-icons/io";
import { LuMapPin, LuSearch, LuShoppingCart, LuUser } from "react-icons/lu";
import { RiInstagramFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";


const Footer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // 👇 Thêm hiệu ứng đang nhập
      const typingMessage = { role: "typing", content: "FoodBot đang tìm kiếm..." };
      setMessages((prev) => [...prev, typingMessage]);

      const res = await axios.get(`http://127.0.0.1:3001/chat?q=${encodeURIComponent(text)}`);
      const reply = res.data?.answer || "Không có phản hồi.";
      const botMessage = { role: "bot", content: reply };

      // 👇 Xóa "typing", rồi thêm phản hồi thật
      setMessages((prev) =>
        [...prev.filter((m) => m.role !== "typing"), botMessage]
      );
    } catch (err) {
      const failMessage = { role: "bot", content: "Không thể kết nối đến chatbot." };
      setMessages((prev) =>
        [...prev.filter((m) => m.role !== "typing"), failMessage]
      );
    }
  };

  // 🔽 Scroll tới dòng cuối khi có tin nhắn mới
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div
        className="position-fixed"
        style={{ bottom: "20px", right: "20px", zIndex: 9999 }}
      >
        {open ? (
          <div className="card shadow rounded" style={{ width: "320px", height: "420px" }}>
            <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
              <strong>Chat với FoodBot</strong>
              <button className="btn btn-sm btn-light" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            <div
              className="card-body"
              style={{ overflowY: "auto", height: "300px", background: "#fff" }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-2 d-flex ${
                    msg.role === "user"
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  <div
                    className={`px-2 py-1 rounded ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : msg.role === "typing"
                        ? "bg-light text-muted fst-italic"
                        : "bg-light text-dark"
                    }`}
                    style={{ maxWidth: "80%" }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            <div className="card-footer p-2">
              <form onSubmit={handleSend}>
                <div className="input-group">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Nhập câu hỏi..."
                    required
                  />
                  <div className="input-group-append">
                    <button className="btn btn-danger btn-sm" type="submit">
                      Gửi
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <button
            className="btn btn-danger rounded-circle shadow"
            style={{ width: "56px", height: "56px" }}
            onClick={() => setOpen(true)}
            title="Chat với FoodBot"
          >
            <TbMessageChatbot style={{ width: "30px", height: "30px" }} />
          </button>
        )}
      </div>
      <footer className="section-footer border-top bg-dark">
        <div className="container">
          <section className="footer-top padding-y py-5">
            <div className="row">
              <aside className="col-md-4 footer-about">
                <article className="d-flex pb-3">
                  <div>
                    <img
                      alt="#"
                      src="img/logo_web.png"
                      className="logo-footer mr-3"
                    />
                  </div>
                  <div>
                    <h6 className="title text-white">Food</h6>
                    <p className="text-muted">
                      Đây là trang web cho phép mọi người có thể mua sắm đồ ăn
                      uống
                    </p>
                    <div className="d-flex align-items-center">
                      <Link
                        className="btn btn-icon btn-outline-light mr-1 btn-sm"
                        title="Facebook"
                        target="_blank"
                        to={"#"}
                      >
                        <FaFacebook />
                      </Link>
                      <Link
                        className="btn btn-icon btn-outline-light mr-1 btn-sm"
                        title="Instagram"
                        target="_blank"
                        to="#"
                      >
                        <RiInstagramFill />
                      </Link>
                      <Link
                        className="btn btn-icon btn-outline-light mr-1 btn-sm"
                        title="Youtube"
                        target="_blank"
                        to="#"
                      >
                        <IoLogoYoutube />
                      </Link>
                      <Link
                        className="btn btn-icon btn-outline-light mr-1 btn-sm"
                        title="Twitter"
                        target="_blank"
                        to="#"
                      >
                        <FaXTwitter />
                      </Link>
                    </div>
                  </div>
                </article>
              </aside>
              <aside className="col-sm-3 col-md-2 text-white">
               
              </aside>
              <aside className="col-sm-3 col-md-2 text-white">
                <h6 className="title">Dịch vụ</h6>
                <ul className="list-unstyled hov_footer">
                  <li>
                    <Link to="/faq" className="text-muted">
                      Câu hỏi thường gặp
                    </Link>
                  </li>
                  <li>
                    <Link to="contact" className="text-muted">
                      Liên hệ
                    </Link>
                  </li>
                  <li>
                    <Link to="terms" className="text-muted">
                      Điều khoản sử dụng
                    </Link>
                  </li>
                  <li>
                    <Link to="privacy" className="text-muted">
                      Chính sách bảo mật
                    </Link>
                  </li>
                </ul>
              </aside>
              <aside className="col-sm-3  col-md-2 text-white">
                <h6 className="title">Người dùng</h6>
                <ul className="list-unstyled hov_footer">
                  <li>
                    <Link to="login" className="text-muted">
                      Đăng nhập
                    </Link>
                  </li>
                  <li>
                    <Link to="sign-up" className="text-muted">
                      Đăng ký
                    </Link>
                  </li>
                </ul>
              </aside>
              <aside className="col-sm-3  col-md-2 text-white">
                <h6 className="title">Trang khác</h6>
                <ul className="list-unstyled hov_footer">
                  <li>
                    <Link to="trending" className="text-muted">
                      Xu hướng
                    </Link>
                  </li>
                  
                </ul>
              </aside>
            </div>
          </section>
        </div>

        <section className="footer-copyright border-top py-3 bg-light">
          <div className="container d-flex align-items-center">
            <p className="text-muted mb-0 ml-auto d-flex align-items-center">
              <Link to="#" className="d-block">
                <img alt="#" src="img/appstore.png" height="40" />
              </Link>
              <Link to="#" className="d-block ml-3">
                <img alt="#" src="img/playmarket.png" height="40" />
              </Link>
            </p>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
