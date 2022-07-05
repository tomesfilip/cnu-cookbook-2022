const SearchInput = (props) => {
  return (
    <input
      type="text"
      className="my-4 px-2 py-1 outline-none border-2 border-slate-700 rounded focus:border-slate-400 transition-colors duration-300"
      placeholder="Vyhledat recept..."
      {...props}
    />
  );
};

export default SearchInput;
