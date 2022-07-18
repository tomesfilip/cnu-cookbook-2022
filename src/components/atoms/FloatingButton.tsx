import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/FloatingButton.scss';

interface Props {
  linkTo: string;
  children?: ReactNode;
}

const FloatingButton: FC<Props> = ({ linkTo, children }) => {
  return (
    <Link
      to={linkTo}
      className="floating-button flex items-center right-bottom border-2 border-slate-700 px-4 py-2 text-slate-700 hover:text-white hover:fill-white rounded hover:rounded-xl hover:bg-slate-600 transition-all duration-300 ease-in-out"
      role="button"
    >
      {children}
    </Link>
  );
};

export default FloatingButton;
