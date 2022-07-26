import { FC, ReactNode } from 'react';

interface Props {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
  cname?: string;
}

const OutlineSmButton: FC<Props> = ({
  onClick,
  disabled = false,
  children,
  cname,
}) => {
  return (
    <button
      className={`flex items-center border-2 border-slate-700 px-4 py-1 text-slate-700 hover:text-white rounded hover:rounded-xl hover:bg-slate-600 transition-all duration-300 ease-in-out disabled:opacity-25 disabled:cursor-not-allowed ${cname}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};
export default OutlineSmButton;
