import { Link } from "react-router-dom";

const SliderItem = ({ banner }) => {
  console.log(banner)
  return (
    <div className="cat-item px-1 py-3">
      <Link className="d-block text-center shadow-sm" href="#">
        <img alt={"ảnh dep"} src={banner?.image} className="img-fluid rounded"/>
      </Link>
    </div>

  );
};

export default SliderItem;
