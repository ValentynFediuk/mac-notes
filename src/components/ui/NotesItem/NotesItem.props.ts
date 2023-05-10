import { Dispatch } from "react";

export interface NotesItemProps {
  id: string;
  description: string;
  title: string;
  date: Date;
  selected: boolean;
  handleSelectNote: Dispatch
}
