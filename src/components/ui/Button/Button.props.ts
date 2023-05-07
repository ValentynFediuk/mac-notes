import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  typeBtn: string;
  appearance: 'primary';
  handleClick?: () => void;
}
