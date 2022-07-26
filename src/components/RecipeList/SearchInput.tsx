import { FC } from 'react';
import { MdOutlineSearch } from 'react-icons/md';

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: FC<Props> = ({ value, setValue }) => {
  return (
    <div className="flex items-center border-2 border-slate-700 rounded transition-colors duration-300 px-2 py-1">
      <MdOutlineSearch size="1.5em" />
      <input
        type="text"
        className="px-2 py-1 outline-none"
        placeholder="Vyhledat recept..."
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
};

export default SearchInput;
