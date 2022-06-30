import { Link } from 'react-router-dom';
import '../scss/FloatingButton.scss';

const FloatingButton = ({ linkText, linkTo }) => {
  return (
    <Link
      to={linkTo}
      className="floating-button right-bottom btn btn-dark btn-lg"
      role="button"
    >
      {linkText}
    </Link>
  );
};

export default FloatingButton;
