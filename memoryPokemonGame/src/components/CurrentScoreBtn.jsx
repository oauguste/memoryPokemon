import "./CurrentScoreBtn.css";
import PropTypes from "prop-types";
const CurrentScoreBtn = ({ number }) => {
  return (
    <div className="currentScore">
      <h1>
        Current Score: <span>{number}</span>
      </h1>
    </div>
  );
};
CurrentScoreBtn.propTypes = {
  number: PropTypes.number.isRequired, // Add the missing prop type validation
  // Add the missing prop type validation
  // addName: PropTypes.func.isRequired, // Add the missing prop type validation
};
export default CurrentScoreBtn;
