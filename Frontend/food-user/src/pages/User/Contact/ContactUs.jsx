import { useState } from "react";
import { useDispatch } from "react-redux";
import { createContact } from "../../../features/contact/contactSlice";

const ContactUs = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createContact({ message }));
  };
  return (
    <div className="osahan-cart-item-profile bg-white rounded shadow-sm p-4">
      <div className="flex-column">
        <h6 className="font-weight-bold">Hãy cho chúng tôi biết về bạn</h6>
        <p className="text-muted">
          Cho dù bạn có thắc mắc hay bạn chỉ muốn chào hỏi, hãy liên hệ với
          chúng tôi.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="small font-weight-bold"
            >
              CHÚNG TÔI CÓ THỂ GIÚP BẠN NHƯ THẾ NÀO?
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              placeholder="Xin chào, tôi muốn..."
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {errors.message && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Xác nhận
          </button>
        </form>

        <div className="mapouter pt-3">
          <div className="gmap_canvas" style={{
            overflow: "hidden",
            background: "none!important",
            height: "300px",
            width: "100%",
          }}>
            <iframe
              width="100%"
              height="100%"
              id="gmap_canvas"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7450.541753670395!2d105.79562539037852!3d20.98177624011233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acc3ae37fc47%3A0x607ded9d4d1d1182!2zVHJp4buBdSBLaMO6YywgVMOibiBUcmnhu4F1LCBUaGFuaCBUcsOsLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1723643249446!5m2!1svi!2s"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
