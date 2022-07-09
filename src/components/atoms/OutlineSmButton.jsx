const OutlineSmButton = ({ btnText, onClick, disabled }) => {
  return (
    <button
      className="border-2 border-slate-700 px-4 py-1 text-slate-700 hover:text-white rounded hover:rounded-xl hover:bg-slate-600 transition-all duration-300 ease-in-out disabled:opacity-25 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {btnText}
    </button>
  );
};
export default OutlineSmButton;
