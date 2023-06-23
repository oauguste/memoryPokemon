import "./CardComponent.css";
import PropTypes from "prop-types";

const CardComponent = ({ img, name, remove }) => {
  return (
    <div className="cardContainer" onClick={remove}>
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
  remove: PropTypes.func.isRequired, // Add the missing prop type validation
  // addName: PropTypes.func.isRequired, // Add the missing prop type validation
};
export default CardComponent;
