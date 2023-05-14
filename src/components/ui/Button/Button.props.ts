import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  typeBtn: 'button' | 'submit';
  appearance: 'primary' | 'disabled';
  handleClick: () => void;
}
