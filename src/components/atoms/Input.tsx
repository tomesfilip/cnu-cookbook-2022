import { ChangeEventHandler, FC } from 'react';

interface Props {
  type: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  value?: string | number;
  autoComplete?: string;
}

const Input: FC<Props> = ({
  type,
  name,
  placeholder,
  required,
  value,
  autoComplete,
  onChange,
  onFocus,
}) => {
  return (
    <input
      className="border-2 rounded-lg px-2 py-1"
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      onFocus={onFocus}
      value={value ? value : ''}
      autoComplete={autoComplete}
    />
  );
};
export default Input;
