import "./CardComponent.css";
import PropTypes from "prop-types";

const CardComponent = ({ img, name }) => {
  return (
    <div className="cardContainer">
      <div className="imageContainer">
        <img src={img} alt="" />
      </div>
      <div className="imageName">
        <h2>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h2>
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  img: PropTypes.string.isRequired, // Add the missing prop type validation
  name: PropTypes.string.isRequired, // Add the missing prop type validation
};
export default CardComponent;
