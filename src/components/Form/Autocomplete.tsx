import React, { FC } from 'react';

import IIngredient from '../../models/IIngredient';

interface Props {
  suggestionList: string[];
  ingredient: IIngredient;
  setIngredient: React.Dispatch<React.SetStateAction<IIngredient | null>>;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  noSuggestionText: string;
  limit?: number;
}

const Autocomplete: FC<Props> = ({
  ingredient,
  setIngredient,
  suggestionList,
  setShowSuggestions,
  noSuggestionText,
  limit = 5,
}) => {
  const handleSuggestionClick = (suggestion: string) => {
    setIngredient({ ...ingredient, name: suggestion });
    setShowSuggestions(false);
  };
  return (
    <ul className="absolute z-10 bg-slate-400 w-full p-2 rounded-lg mt-1">
      {suggestionList.length < 1 && (
        <li className="px-2">{noSuggestionText}</li>
      )}
      {suggestionList.slice(0, limit).map((suggestion) => (
        <li
          key={suggestion}
          className="rounded-lg px-2 hover:bg-slate-200 cursor-pointer"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};
export default Autocomplete;
