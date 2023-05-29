import { Entry, EntryStatus } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  entries: Entry[]; // falta tipo de dato del arreglo
  addNewEntry: (description: string, status: EntryStatus) => void;
  updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
  deleteEntry: (entryId: string, showSnackbar?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);
