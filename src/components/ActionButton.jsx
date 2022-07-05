const ActionButton = ({ btnText, handleAction }) => {
  return (
    <button
      className="border-2 border-slate-700 px-4 py-1 text-slate-700 hover:text-white rounded hover:rounded-xl hover:bg-slate-600 transition-all duration-300 ease-in-out"
      onClick={handleAction}
    >
      {btnText}
    </button>
  );
};
export default ActionButton;
