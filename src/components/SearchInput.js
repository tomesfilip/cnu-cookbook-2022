import { Input } from 'reactstrap';

const SearchInput = (props) => {
  return (
    <Input
      bsSize="lg"
      type="text"
      className="mb-4"
      placeholder="Vyhledat recept..."
      {...props}
    />
  );
};

export default SearchInput;
