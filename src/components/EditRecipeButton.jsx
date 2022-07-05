import { Link } from 'react-router-dom';

const EditRecipeButton = ({ linkText, linkTo }) => {
  return (
    <div>
      <Link to={linkTo} className="btn btn-outline btn-md">
        {linkText}
      </Link>
    </div>
  );
};
export default EditRecipeButton;
