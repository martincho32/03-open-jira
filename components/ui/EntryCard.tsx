import { Card, Typography, CardContent, CardActionArea, CardActions } from '@mui/material';
import { Entry } from '@/interfaces';
import { FC, DragEvent } from 'react';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { description, createdAt } = entry;
  const creationDate = new Date( createdAt ).toLocaleDateString("es-AR", {
    weekday: "long", // narrow, short
    year: "numeric", // 2-digit
    month: "short", // numeric, 2-digit, narrow, long
    day: "numeric" // 2-digit
  })
  
  const onDragStart = (event: DragEvent) => {
    // todo: modificar el estado para indicar que estoy haciendo drag
    event.dataTransfer.setData('text', entry._id)
  }

  const onDragEnd = () => {
    //todo: cancelar onDrag
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={ onDragEnd }
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{ description }</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>
            { creationDate }
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
