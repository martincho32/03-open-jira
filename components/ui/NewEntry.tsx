import { ChangeEvent, FC, useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from "@/context/entries";
import { EntryStatus } from "@/interfaces";
import { UIContext } from "@/context/ui";

interface Props {
  status: EntryStatus;
}

export const NewEntry: FC<Props> = ({ status }) => {

  const [inputValue, setInputValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry  } = useContext(UIContext)


  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (inputValue.length === 0) {
      setIsTouched(true);
      return;
    }

    addNewEntry(inputValue, status);
    setInputValue('');
    setIsAddingEntry(false);
    setIsTouched(false);
  };

  const onBlur = () => {
    if (inputValue.length === 0) return;

    setIsTouched(true);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={
              inputValue.length <= 0 && isTouched && "Ingrese un valor"
            }
            error={inputValue.length <= 0 && isTouched}
            value={inputValue}
            onChange={onTextFieldChanged}
            onBlur={onBlur}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="text"
              onClick={() => {
                setIsTouched(false);
                setIsAddingEntry(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agragar tarea
        </Button>
      )}
    </Box>
  );
};
