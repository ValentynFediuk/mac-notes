export interface SearchProps {
  placeholder: string;
  inputType: 'text';
  appearance: 'primary';
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
