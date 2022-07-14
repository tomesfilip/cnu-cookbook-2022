const Autocomplete = ({
  suggestionList,
  handleSugggestionClick,
  noSuggestionText,
  limit = 5,
}) => {
  return (
    <ul className="absolute z-10 bg-slate-400 w-full p-2 rounded-lg mt-1">
      {suggestionList.length < 1 && (
        <li className="px-2">{noSuggestionText}</li>
      )}
      {suggestionList.slice(0, limit).map((suggestion) => (
        <li
          key={suggestion}
          className="rounded-lg px-2 hover:bg-slate-200 cursor-pointer"
          onClick={() => handleSugggestionClick(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};
export default Autocomplete;
