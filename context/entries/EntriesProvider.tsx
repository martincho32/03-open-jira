import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { EntriesContext, entriesReducer } from "./";
import { Entry, EntryStatus } from "@/interfaces";
import { entriesApi } from "@/apis";
import { useSnackbar } from "notistack";

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addNewEntry = async (description: string, status: EntryStatus) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });

    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });

      if (showSnackbar) {
        enqueueSnackbar("Entrada actualizada", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
        
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  };

  
  const deleteEntry = async (id: string, showSnackbar = false) => {
    const action = (snackbarId: any) => (
      <>
        <button onClick={() => { alert(`I belong to snackbar with id ${snackbarId}`); }}>
          Undo
        </button>
        <button onClick={() => { closeSnackbar(snackbarId) }}>
          Dismiss
        </button>
      </>
    );
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${id}`, {
      });
      dispatch({ type: "[Entry] Delete-Entry", payload: data._id });
      await refreshEntries();
      if (showSnackbar) {
        enqueueSnackbar("Entrada eliminada", {
          variant: "warning",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          },
          action,
          
        });
        
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //Methods
        addNewEntry,
        updateEntry,
        deleteEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
