import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { Layout } from "@/components/layouts";
import {
  capitalize,
  Card,
  Grid,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  IconButton,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Entry, EntryStatus } from "@/interfaces";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { dbEntries } from "@/database";
import { EntriesContext } from '@/context/entries';


const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];


interface Props {
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  
  const { updateEntry } = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [isTouched, setIsTouched] = useState(false);

  const isNotValid = useMemo(
    () => inputValue.length <= 0 && isTouched,
    [inputValue, isTouched]
  );

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }
    updateEntry(updatedEntry, true);
  };

  const creationDate = new Date( entry.createdAt ).toLocaleDateString("es-AR", {
    weekday: "long", // narrow, short
    year: "numeric", // 2-digit
    month: "short", // numeric, 2-digit, narrow, long
    day: "numeric", // 2-digit
    hour: "2-digit",
    minute: "2-digit"
  })

  return (
    <Layout title={ inputValue.substring(0, 20) + "..." }>
      <>
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Grid item xs={12} sm={8} md={6}>
            <Card>
              <CardHeader
                title={`Entrada:`}
                subheader={`Creada el: ${creationDate}`}
              />
              <CardContent>
                <TextField
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  fullWidth
                  placeholder="Nueva entrada"
                  autoFocus
                  multiline
                  label="Nueva entrada"
                  value={inputValue}
                  onChange={onTextFieldChanged}
                  helperText={!isNotValid && "Ingrese una entrada"}
                  onBlur={() => setIsTouched(true)}
                  error={isNotValid}
                />

                <FormControl>
                  <FormLabel>Estado:</FormLabel>
                  <RadioGroup row value={status} onChange={onStatusChange}>
                    {validStatus.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={capitalize(option)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>

                {/* Radio */}
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<SaveOutlinedIcon />}
                  variant="contained"
                  fullWidth
                  onClick={onSave}
                  disabled={ inputValue.length <= 0 }
                >
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <IconButton
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            backgroundColor: "",
          }}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </>
    </Layout>
  );
};


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  console.log({entry})

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;
