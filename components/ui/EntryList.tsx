import { DragEvent, FC, useContext, useMemo } from "react";
import { Paper, List } from "@mui/material";
import { EntryCard } from "./EntryCard";
import { EntryStatus } from "@/interfaces";
import { EntriesContext } from "@/context/entries";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(() =>  entries.filter((entry) => entry.status === status), [ entries ])
    
  const onDropEntry = (event: DragEvent) => {
    const id = event.dataTransfer.getData('text');
  }

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  }

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={ allowDrop }
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "auto",
          backgroundColor: "transparent",
          padding: "1px 5px",
        }}
      >
        <List sx={{ opacity: 1 }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={ entry._id} entry={entry}  />
            ))
          }
        </List>
      </Paper>
    </div>
  );
};
